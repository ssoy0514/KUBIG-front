import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NotionRenderer } from 'react-notion';
import katex from 'katex';
import he from 'he';

import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'katex/dist/katex.min.css';

export default function ReactNotion({ pageId }) {
  const [response, setResponse] = useState({});
  const notionRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  function transformData(data) {
    Object.keys(data).forEach(key => {
      const entry = data[key];
      if (entry && entry.value && entry.value.properties && entry.value.properties.title) {
        entry.value.properties.title = entry.value.properties.title.map(item => {
          // "⁌"와 "e"가 있는 항목 찾기
          if (item[0] === "⁍" && item[1] && item[1][0] && item[1][0][0] === "e") {
            return ["⁌" + item[1][0][1] + "⁍"]; // 변형 로직으로 치환
          }
          return item; // 변형하지 않고 원래 항목 반환
        });
      }
      if (entry && entry.value) { 
        if (entry.value.type === "equation") {
          // equation 타입을 text 타입으로 변경
          entry.value.type = "text";
          // properties.title에 LaTeX 수식을 특수 문자로 감싸기
          if (entry.value.properties && entry.value.properties.title) {
            entry.value.properties.title = entry.value.properties.title.map(line =>
              line.map(part => `☙${part}❧`) // LaTeX 수식 감싸기
            );
          }
        } else if (entry.value.type === "callout") {
          const parentContent = data[entry.value.parent_id].value.content;
          // 콜아웃의 위치 인덱스 찾기
          const calloutIndex = parentContent.indexOf(entry.value.id);

          if (calloutIndex !== -1) {
            // 콜아웃 바로 다음 위치에 하위 요소들 삽입
            parentContent.splice(calloutIndex + 1, 0, ...entry.value.content);
          }
          // 하위 요소들의 parent_id 업데이트
          entry.value.content.forEach((childId) => {
            const child = data[childId];
            if (child) {
              child.value.parent_id = entry.value.parent_id;
            }
          });
        }
      }
    });
    return data;
  }

  useEffect(() => {
    if (pageId) {
      console.log(pageId)
      const NOTION_PAGE_ID = pageId;
      axios
        .get(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
        .then(({ data }) => {
          const transformedData = transformData(data);
          setResponse(transformedData);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [pageId]);

  useEffect(() => {
    if (notionRef.current) {
      const html = notionRef.current.innerHTML;
      const transformedHtml = transformHtml(html); // HTML 변환 함수
      notionRef.current.innerHTML = transformedHtml;
    }
  }, [response]); // response가 변할 때마다 HTML 변환

  if (isLoading) {
    return "Loading Pages..";
  }

  return (
    Object.keys(response).length ? (
      <div ref={notionRef}>
        <NotionRenderer blockMap={response} fullPage={true} />
      </div>
    ) : (
      "게시글을 불러올 수 없습니다."
    )
  );
}

function transformHtml(html) {
  // LaTeX와 SVG 변환을 처리하는 정규식
  const regex = /⁌([\s\S]*?)⁍|☙([\s\S]*?)❧|<span class="(notion-emoji [^"]*)" role="img" aria-label="([^"]+\.svg)">[^<]+<\/span>/g;

  return html.replace(regex, (match, latex1, latex2, classNames, svgPath) => {
    if (latex1 || latex2) {
      const targetLatex = latex1 || latex2;
      // 줄바꿈을 LaTeX 호환으로 변환
      const processedLatex = targetLatex.replace(/\n/g, ' \\\\ ');
      // HTML 엔티티 디코드
      const decodedLatex = he.decode(processedLatex);
      return katex.renderToString(decodedLatex, {
        throwOnError: false,
        displayMode: !!latex2
      });
    } else if (svgPath) {
      // SVG 경로가 있는 경우 - 이미지 태그로 변환
      return `<img class="${classNames}" src="https://www.notion.so${svgPath}">`;
    }
    return '';
  });
}