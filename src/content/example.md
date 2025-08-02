# CommonMark Example Page

Ready to explore every CommonMark element? Here’s a single‐page cheat sheet:

## ATX Headings

# H1  
## H2  
### H3  
#### H4  
##### H5  
###### H6  

## Setext Headings

Heading Level 1  
===============

Heading Level 2  
---------------

## Blockquote

> “To be, or not to be, that is the question.”  
> — William Shakespeare

## Lists

### Unordered

- Item A  
- Item B  
  - Subitem B.1  
  - Subitem B.2  
+ Item C  
* Item D  

### Ordered

1. First item  
2. Second item  
   1. Sub-first  
   2. Sub-second  
3. Third item  

## Code Blocks

### Indented code

    # This is an indented code block
    for i in range(3):
        print(i)

### Fenced code with syntax highlighting

```python
def greet(name):
    print(f"Hello, {name}!")
```

## Thematic Break

Three or more hyphens, asterisks, or underscores:

---  
***  
___

## HTML Block

<div style="color: blue;">
  <p>This is a raw HTML block.</p>
</div>

## Paragraphs and Line Breaks

This is the first line.  
This is the second line after a hard break.

This is a paragraph that  
spans multiple lines but turns  
into a single line when rendered.

## Emphasis and Strong Emphasis

*italic* _italic_  
**bold** __bold__  
***bold italic***  
**_mixed emphasis_**

## Code Spans

Use the `printf()` function to print text.

## Links

[Inline link](http://example.com "Example Title")  
[Reference link][example]

## Images

![Alt Text](/path/to/img.jpg "Optional Title")  
![Reference image][logo]

## Autolinks and Escaped Characters

<http://example.com>  
Escape literal asterisks: \*\*not bold\*\*

## HTML Inline

This is an <span style="font-weight: bold;">inline HTML</span> example.

## Entities

&copy; 2025 Example Corp. &reg;

## HTML Comment

<!-- This comment will not be rendered -->

## Reference Definitions

[example]: http://example.com "Example Domain"  
[logo]: /path/to/logo.png "Logo"

---

*Note: Core CommonMark (v0.29) does not include tables, footnotes, or strikethrough syntax.*