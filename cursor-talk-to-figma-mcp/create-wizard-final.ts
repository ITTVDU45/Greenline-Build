import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

async function createWizard() {
  const transport = new StdioClientTransport({
    command: '/Users/tolgahanvardar/.bun/bin/bun',
    args: ['run', '/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/src/talk_to_figma_mcp/server.ts']
  });
  
  const client = new Client({
    name: 'wizard-creator',
    version: '1.0.0'
  }, { capabilities: {} });
  
  try {
    await client.connect(transport);
    console.log('✅ MCP-Client verbunden\n');
    
    console.log('🔌 Verbinde mit Figma (Channel: a4nnb0cw)...\n');
    
    await client.callTool({
      name: 'join_channel',
      arguments: { channel: 'a4nnb0cw' }
    });
    
    console.log('✅ Verbunden!\n');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const doc = await client.callTool({
      name: 'get_document_info',
      arguments: {}
    });
    
    const docData = JSON.parse(doc.content[0].text);
    console.log(`📄 Dokument: ${docData.name} | Page: ${docData.currentPage.name}\n`);
    
    console.log('🎨 Erstelle Wizard-Screens...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const green = hexToRgb('#1F7A4D');
    const lightGray = { r: 0.95, g: 0.95, b: 0.95 };
    const borderGray = { r: 0.88, g: 0.88, b: 0.88 };
    
    const w = 390;
    const h = 844;
    
    // ==========================================
    // SCHRITT 1: PROJEKTIDENTITÄT
    // ==========================================
    const x1 = 2600;
    const y1 = 200;
    
    console.log('📝 Schritt 1/7: Projektidentität\n');
    
    // Marker Text
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1, y: y1 - 60, text: '📝 SCHRITT 1: Projektidentität', fontSize: 22, name: '📝 Step1 Marker' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    // Background
    const bg1 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x1, y: y1, width: w, height: h, name: 'Step1 Background' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const bg1Text = bg1.content[0]?.text || '';
    const bg1Match = bg1Text.match(/"id":"([^"]+)"/);
    
    if (bg1Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: bg1Match[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: bg1Match[1], radius: 20 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Progress
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + w/2 - 35, y: y1 + 30, text: 'Schritt 1 / 7', fontSize: 14, name: 'Progress1' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Progress Bar BG
    const pBg1 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x1 + 40, y: y1 + 60, width: w - 80, height: 4, name: 'ProgressBG1' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const pBg1Text = pBg1.content[0]?.text || '';
    const pBg1Match = pBg1Text.match(/"id":"([^"]+)"/);
    
    if (pBg1Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: pBg1Match[1], r: lightGray.r, g: lightGray.g, b: lightGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: pBg1Match[1], radius: 2 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Progress Bar Active
    const pActive1 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x1 + 40, y: y1 + 60, width: (w - 80) * 0.14, height: 4, name: 'ProgressActive1' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const pActive1Text = pActive1.content[0]?.text || '';
    const pActive1Match = pActive1Text.match(/"id":"([^"]+)"/);
    
    if (pActive1Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: pActive1Match[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: pActive1Match[1], radius: 2 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Titel
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 24, y: y1 + 100, text: 'Projektidentität', fontSize: 28, name: 'Title1' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 24, y: y1 + 140, text: 'Lass uns dein Projekt kennenlernen', fontSize: 16, name: 'Subtitle1' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Card 1: Projektname
    const card1 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x1 + 24, y: y1 + 200, width: w - 48, height: 120, name: 'Card Projektname' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const card1Text = card1.content[0]?.text || '';
    const card1Match = card1Text.match(/"id":"([^"]+)"/);
    
    if (card1Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: card1Match[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: card1Match[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_weight',
        arguments: { nodeId: card1Match[1], weight: 1 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: card1Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 40, y: y1 + 216, text: 'Projektname *', fontSize: 14, name: 'Label Projektname' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 40, y: y1 + 245, text: 'z.B. "Garten Müller – Hinterhof"', fontSize: 16, name: 'Placeholder Projektname' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 40, y: y1 + 288, text: 'Für Übersicht & Angebote', fontSize: 12, name: 'Hint Projektname' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Card 2: Projektbeschreibung
    const card2 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x1 + 24, y: y1 + 340, width: w - 48, height: 150, name: 'Card Beschreibung' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const card2Text = card2.content[0]?.text || '';
    const card2Match = card2Text.match(/"id":"([^"]+)"/);
    
    if (card2Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: card2Match[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: card2Match[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_weight',
        arguments: { nodeId: card2Match[1], weight: 1 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: card2Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 40, y: y1 + 356, text: 'Projektbeschreibung (Optional)', fontSize: 14, name: 'Label Beschreibung' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 40, y: y1 + 385, text: 'Was ist dir wichtig?', fontSize: 16, name: 'Placeholder Beschreibung' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + 40, y: y1 + 415, text: '2-3 Zeilen für deine Wünsche', fontSize: 12, name: 'Hint Beschreibung' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Button Weiter
    const btn1 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x1 + 24, y: y1 + h - 90, width: w - 48, height: 56, name: 'Button Weiter Step1' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const btn1Text = btn1.content[0]?.text || '';
    const btn1Match = btn1Text.match(/"id":"([^"]+)"/);
    
    if (btn1Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: btn1Match[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: btn1Match[1], radius: 50 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x1 + w/2 - 25, y: y1 + h - 72, text: 'Weiter', fontSize: 18, name: 'ButtonText1' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    console.log('   ✅ Step 1 erstellt\n');
    
    // ==========================================
    // SCHRITT 2: PROJEKTADRESSE
    // ==========================================
    const x2 = 3040;
    const y2 = 200;
    
    console.log('🏠 Schritt 2/7: Projektadresse\n');
    
    // Marker
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2, y: y2 - 60, text: '🏠 SCHRITT 2: Projektadresse', fontSize: 22, name: '🏠 Step2 Marker' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    // Background
    const bg2 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2, y: y2, width: w, height: h, name: 'Step2 Background' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const bg2Text = bg2.content[0]?.text || '';
    const bg2Match = bg2Text.match(/"id":"([^"]+)"/);
    
    if (bg2Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: bg2Match[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: bg2Match[1], radius: 20 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Progress
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + w/2 - 35, y: y2 + 30, text: 'Schritt 2 / 7', fontSize: 14, name: 'Progress2' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Progress Bar BG
    const pBg2 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 40, y: y2 + 60, width: w - 80, height: 4, name: 'ProgressBG2' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const pBg2Text = pBg2.content[0]?.text || '';
    const pBg2Match = pBg2Text.match(/"id":"([^"]+)"/);
    
    if (pBg2Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: pBg2Match[1], r: lightGray.r, g: lightGray.g, b: lightGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: pBg2Match[1], radius: 2 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Progress Bar Active (28%)
    const pActive2 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 40, y: y2 + 60, width: (w - 80) * 0.28, height: 4, name: 'ProgressActive2' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const pActive2Text = pActive2.content[0]?.text || '';
    const pActive2Match = pActive2Text.match(/"id":"([^"]+)"/);
    
    if (pActive2Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: pActive2Match[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: pActive2Match[1], radius: 2 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Titel
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 24, y: y2 + 100, text: 'Projektadresse', fontSize: 28, name: 'Title2' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 24, y: y2 + 140, text: 'Wo befindet sich dein Projekt?', fontSize: 16, name: 'Subtitle2' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Card: Straße
    const cardStr = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 24, y: y2 + 200, width: w - 48, height: 80, name: 'Card Strasse' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const cardStrText = cardStr.content[0]?.text || '';
    const cardStrMatch = cardStrText.match(/"id":"([^"]+)"/);
    
    if (cardStrMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: cardStrMatch[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: cardStrMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_weight',
        arguments: { nodeId: cardStrMatch[1], weight: 1 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: cardStrMatch[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 40, y: y2 + 216, text: 'Straße & Hausnummer *', fontSize: 14, name: 'Label Strasse' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 40, y: y2 + 242, text: 'z.B. Musterstraße 123', fontSize: 16, name: 'Placeholder Strasse' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Card: PLZ
    const cardPLZ = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 24, y: y2 + 300, width: 150, height: 80, name: 'Card PLZ' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const cardPLZText = cardPLZ.content[0]?.text || '';
    const cardPLZMatch = cardPLZText.match(/"id":"([^"]+)"/);
    
    if (cardPLZMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: cardPLZMatch[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: cardPLZMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_weight',
        arguments: { nodeId: cardPLZMatch[1], weight: 1 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: cardPLZMatch[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 40, y: y2 + 316, text: 'PLZ *', fontSize: 14, name: 'Label PLZ' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 40, y: y2 + 342, text: '12345', fontSize: 16, name: 'Placeholder PLZ' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Card: Ort
    const cardOrt = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 190, y: y2 + 300, width: 176, height: 80, name: 'Card Ort' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const cardOrtText = cardOrt.content[0]?.text || '';
    const cardOrtMatch = cardOrtText.match(/"id":"([^"]+)"/);
    
    if (cardOrtMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: cardOrtMatch[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: cardOrtMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_weight',
        arguments: { nodeId: cardOrtMatch[1], weight: 1 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: cardOrtMatch[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 206, y: y2 + 316, text: 'Ort *', fontSize: 14, name: 'Label Ort' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 206, y: y2 + 342, text: 'Berlin', fontSize: 16, name: 'Placeholder Ort' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Card: Land
    const cardLand = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 24, y: y2 + 400, width: w - 48, height: 80, name: 'Card Land' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const cardLandText = cardLand.content[0]?.text || '';
    const cardLandMatch = cardLandText.match(/"id":"([^"]+)"/);
    
    if (cardLandMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: cardLandMatch[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: cardLandMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_weight',
        arguments: { nodeId: cardLandMatch[1], weight: 1 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: cardLandMatch[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 40, y: y2 + 416, text: 'Land *', fontSize: 14, name: 'Label Land' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 40, y: y2 + 442, text: 'Deutschland', fontSize: 16, name: 'Placeholder Land' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Button Zurück
    const btnBack = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 24, y: y2 + h - 90, width: 155, height: 56, name: 'Button Zurück' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const btnBackText = btnBack.content[0]?.text || '';
    const btnBackMatch = btnBackText.match(/"id":"([^"]+)"/);
    
    if (btnBackMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: btnBackMatch[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: btnBackMatch[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_weight',
        arguments: { nodeId: btnBackMatch[1], weight: 2 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: btnBackMatch[1], radius: 50 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 70, y: y2 + h - 72, text: 'Zurück', fontSize: 18, name: 'ButtonText Back' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Button Weiter
    const btnNext = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x2 + 195, y: y2 + h - 90, width: 171, height: 56, name: 'Button Weiter Step2' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const btnNextText = btnNext.content[0]?.text || '';
    const btnNextMatch = btnNextText.match(/"id":"([^"]+)"/);
    
    if (btnNextMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: btnNextMatch[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: btnNextMatch[1], radius: 50 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x2 + 250, y: y2 + h - 72, text: 'Weiter', fontSize: 18, name: 'ButtonText Next' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    console.log('   ✅ Step 2 erstellt\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 Wizard-Screens erfolgreich erstellt!\n');
    console.log('📐 Layout:');
    console.log('   📝 Schritt 1 (X: 2600) → 🏠 Schritt 2 (X: 3040)\n');
    console.log('🔍 In Figma: Cmd/Ctrl + 0 zum Zoomen\n');
    console.log('✨ Features:');
    console.log('   ✅ Card-basierte Formularfelder');
    console.log('   ✅ Progress Bars (14% / 28%)');
    console.log('   ✅ Pflichtfelder mit *');
    console.log('   ✅ Navigation (Zurück/Weiter)\n');
    
  } catch (error) {
    console.error('\n❌ Fehler:', error.message);
  } finally {
    await client.close();
  }
}

createWizard();
