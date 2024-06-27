// Function to extract and display only sentences or paragraphs
function simplifyPage() {
    // Create a new container for the simplified content
    const simplifiedContent = document.createElement('div');
    simplifiedContent.style.backgroundColor = 'black';
    simplifiedContent.style.color = 'white';
    simplifiedContent.style.fontFamily = 'Courier Prime';
    simplifiedContent.style.padding = '20px';
    simplifiedContent.style.whiteSpace = 'pre-wrap';
    simplifiedContent.style.display = 'flex';
    simplifiedContent.style.justifyContent = 'center';
    simplifiedContent.style.alignItems = 'center';
    simplifiedContent.style.height = '100vh';
  
    // Create a box to contain the text
    const textBox = document.createElement('div');
    textBox.style.backgroundColor = '#333';
    textBox.style.padding = '20px';
    textBox.style.border = '2px solid white';
    textBox.style.maxWidth = '80%';
    textBox.style.overflowY = 'auto';
    textBox.style.textAlign = 'left';
  
    // Set to keep track of unique sentences
    const seenSentences = new Set();
  
    // Function to recursively extract text nodes and headings
    function extractTextNodes(element) {
      if (element.nodeType === Node.TEXT_NODE) {
        // Clean up the text content
        const text = element.textContent.trim();
        if (text && !seenSentences.has(text)) {
          seenSentences.add(text);
          const paragraph = document.createElement('p');
          paragraph.textContent = text;
          paragraph.style.margin = '0';  // Remove unnecessary margins
          textBox.appendChild(paragraph);
        }
      } else if (element.nodeType === Node.ELEMENT_NODE) {
        if (!['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(element.tagName)) {
          // Clone headings
          if (/^H[1-6]$/.test(element.tagName) && !seenSentences.has(element.textContent.trim())) {
            seenSentences.add(element.textContent.trim());
            const heading = document.createElement(element.tagName);
            heading.textContent = element.textContent.trim();
            heading.style.marginTop = '20px';  // Add space before headings
            textBox.appendChild(heading);
          }
          // Recursively process child nodes
          element.childNodes.forEach(child => extractTextNodes(child));
        }
      }
    }
  
    // Start extraction from the body element
    extractTextNodes(document.body);
  
    // Remove all existing content
    document.body.innerHTML = '';
  
    // Append the text box to the simplified content
    simplifiedContent.appendChild(textBox);
  
    // Append the simplified content to the body
    document.body.appendChild(simplifiedContent);
  
    // Ensure the body is styled to match the new content
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.body.style.fontFamily = 'monospace';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }
  
  // Check if simplification is enabled and run the function
  chrome.storage.local.get(['simplificationEnabled'], (result) => {
    if (result.simplificationEnabled) {
      simplifyPage();
    }
  });