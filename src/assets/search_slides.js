const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\d25832e6-8281-4fc6-9279-a65afca1d8bc\\.system_generated\\steps\\42\\content.md', 'utf8');

// Find sections of code containing slide titles or descriptions
const keywords = ["Trusted Technology", "Modern School Website", "Advanced Security", "Smart Campus Solutions"];
for (const kw of keywords) {
  const idx = content.indexOf(kw);
  if (idx !== -1) {
    console.log(`Keyword: ${kw}`);
    console.log(content.slice(Math.max(0, idx - 300), Math.min(content.length, idx + 500)));
    console.log("-----------------------------------------");
  } else {
    console.log(`Keyword not found: ${kw}`);
  }
}
