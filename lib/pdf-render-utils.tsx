import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

// Define a type for the styles object
export interface PdfStyles {
  [key: string]: any;
}

// A more comprehensive parser to convert HTML into PDF Text/View elements
export function renderHtmlToPdf(html: string, styles: PdfStyles): React.ReactNode { // Changed return type
  if (!html || typeof html !== 'string') return null; // Return null if no content

  // Ensure we are in a browser environment before using DOMParser
  if (typeof window === 'undefined') return null;

  const domParser = new DOMParser();
  const doc = domParser.parseFromString(html, 'text/html');
  const nodes = doc.body.childNodes;

  const processNode = (node: ChildNode, parentTag?: string): React.ReactNode[] => {
    const result: React.ReactNode[] = [];

    if (node.nodeType === Node.TEXT_NODE) {
      // Split by newlines and create Text elements for each line
      const textContent = node.textContent || '';
      textContent.split('\n').forEach((line, index) => {
        if (line.trim().length > 0) {
          result.push(React.createElement(Text, { key: `text-${index}`, style: styles.paragraph }, line));
        } else if (index > 0) {
          // Add explicit newline for empty lines, but only if not the first line
          result.push(React.createElement(Text, { key: `newline-${index}` }, '\n'));
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      const elementKey = `${tagName}-${Array.from(node.parentNode?.childNodes || []).indexOf(node)}`;
      
      // Recursively process children
      const childrenContent = Array.from(element.childNodes).flatMap((child, childIdx) =>
        processNode(child, tagName).map((resChild, resChildIdx) => {
          // Ensure every child node has a key, either existing or generated
          if (React.isValidElement(resChild)) {
            return React.cloneElement(resChild as React.ReactElement, { key: resChild.key || `${elementKey}-child-${childIdx}-${resChildIdx}` });
          }
          return resChild; // Return non-elements as is, they will be handled by Text
        })
      );

      switch (tagName) {
        case 'strong':
        case 'b':
          result.push(React.createElement(Text, { style: styles.bold, key: elementKey }, childrenContent));
          break;
        case 'em':
        case 'i':
          result.push(React.createElement(Text, { style: styles.italic, key: elementKey }, childrenContent));
          break;
        case 'br':
          // <br> tags are effectively handled by splitting textContent by '\n',
          // but we can add an explicit newline if needed for certain scenarios.
          // For now, let's rely on the textContent splitting.
          break;
        case 'p':
          // Each paragraph gets its own Text component.
          // Add a newline after paragraph if not inside a list item.
          result.push(
            React.createElement(Text, { style: styles.paragraph, key: elementKey }, childrenContent),
          );
          if (parentTag !== 'li') {
            result.push(React.createElement(Text, { key: `${elementKey}-p-newline` }, '\n'));
          }
          break;
        case 'ul':
        case 'ol':
          // Render list items within a View
          result.push(
            React.createElement(View, { style: { marginBottom: 5 }, key: elementKey }, childrenContent)
          );
          break;
        case 'li':
          result.push(
            React.createElement(View, { style: styles.bullet, key: elementKey },
              React.createElement(Text, { style: styles.bulletPoint, key: `${elementKey}-bullet-char` }, '• '),
              React.createElement(View, { style: styles.bulletText, key: `${elementKey}-bullet-text` }, childrenContent)
            )
          );
          break;
        default:
          // For unsupported tags, just render their children, wrapped in a Text or View if necessary
          // If childrenContent has multiple elements, React needs them keyed within a Fragment or wrapper
          if (childrenContent.length === 1 && !React.isValidElement(childrenContent[0])) {
            result.push(React.createElement(Text, { key: elementKey, style: styles.paragraph }, childrenContent[0]));
          } else if (childrenContent.length > 0) {
            result.push(React.createElement(View, { key: elementKey }, childrenContent));
          }
          break;
      }
    }
    return result;
  };

  const children = Array.from(nodes).flatMap((node, index) => {
    const processedNodes = processNode(node);
    // The top-level children from renderHtmlToPdf should already be keyed by processNode
    // This final map just ensures any stray non-elements are handled
    return processedNodes.map((child, childIndex) => {
      const key = `html-node-${index}-${childIndex}`;
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement, { key: child.key || key });
      } else if (child !== null && child !== undefined && child !== '') {
        // If it's a non-empty string or number, wrap it in a <Text> component with a key
        return React.createElement(Text, { key, style: styles.paragraph }, child);
      }
      return null; // Ignore null, undefined, empty string
    });
  }).filter(Boolean); // Filter out any nulls

  // Wrap all children in a single View with a static key
  return React.createElement(View, { key: "html-content-wrapper" }, children);
}