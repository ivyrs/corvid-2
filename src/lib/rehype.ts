import { h } from 'hastscript';

export function rehypeFootnoteHr() {
  return (tree: any) => {
    const { children } = tree;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (
        node.type === 'element' &&
        node.tagName === 'section' &&
        node.properties?.dataFootnotes !== undefined
      ) {
        children.splice(i, 0, h('hr', { class: 'footnotes-sep' }));
        break;
      }
    }
  };
}
