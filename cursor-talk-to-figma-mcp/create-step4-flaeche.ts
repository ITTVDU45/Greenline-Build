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

async function createStep4() {
  const transport = new StdioClientTransport({
    command: '/Users/tolgahanvardar/.bun/bin/bun',
    args: ['run', '/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/src/talk_to_figma_mcp/server.ts']
  });
  
  const client = new Client({
    name: 'step4-flaeche',
    version: '1.0.0'
  }, { capabilities: {} });
  
  try {
    await client.connect(transport);
    
    await client.callTool({
      name: 'join_channel',
      arguments: { channel: 'a4nnb0cw' }
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Verbunden\n');
    console.log('📸 Erstelle SCHRITT 4: Fläche erfassen...\n');
    console.log('📍 Position: X:4050, Y:20\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const green = hexToRgb('#1F7A4D');
    const lightGray = { r: 0.95, g: 0.95, b: 0.95 };
    const borderGray = { r: 0.88, g: 0.88, b: 0.88 };
    const lightGreen = { r: 0.93, g: 0.98, b: 0.95 };
    
    const x = 4050;
    const y = 20;
    const w = 390;
    const h = 844;
    
    // Background
    const bg = await client.callTool({
      name: 'create_rectangle',
      arguments: { x, y, width: w, height: h, name: '📸 SCHRITT 4 - Fläche erfassen' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const bgText = bg.content[0]?.text || '';
    const bgMatch = bgText.match(/"id":"([^"]+)"/);
    
    if (bgMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: bgMatch[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: bgMatch[1], radius: 20 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    console.log('   ✅ Background');
    
    // Progress
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 160, y: y + 30, text: 'Schritt 4 / 5', fontSize: 14, name: 'S4_Progress' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ "Schritt 4 / 5"');
    
    // Progress Bar BG
    const pBg = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 40, y: y + 60, width: 310, height: 4, name: 'S4_ProgBG' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const pBgText = pBg.content[0]?.text || '';
    const pBgMatch = pBgText.match(/"id":"([^"]+)"/);
    
    if (pBgMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: pBgMatch[1], r: lightGray.r, g: lightGray.g, b: lightGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: pBgMatch[1], radius: 2 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Progress Active (80%)
    const pAct = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 40, y: y + 60, width: 248, height: 4, name: 'S4_ProgActive' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const pActText = pAct.content[0]?.text || '';
    const pActMatch = pActText.match(/"id":"([^"]+)"/);
    
    if (pActMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: pActMatch[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: pActMatch[1], radius: 2 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    console.log('   ✅ Progress Bar (80%)\n');
    
    // Titel
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 24, y: y + 100, text: 'Fläche erfassen', fontSize: 28, name: 'S4_Titel' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    // Subtitel (mehrzeilig)
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 24, y: y + 140, text: 'Erfasse deinen Garten per AR-Scan', fontSize: 15, name: 'S4_Sub1' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 24, y: y + 158, text: 'oder mit Fotos – je genauer, desto', fontSize: 15, name: 'S4_Sub2' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 24, y: y + 176, text: 'besser das Ergebnis.', fontSize: 15, name: 'S4_Sub3' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('📋 Titel & Subtitel\n');
    
    // Card 1: AR-Scan (empfohlen)
    console.log('📦 Card 1: AR-Scan...\n');
    
    const card1 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 220, width: 342, height: 200, name: 'S4_CardAR' }
    });
    await new Promise(r => setTimeout(r, 300));
    
    const card1Text = card1.content[0]?.text || '';
    const card1Match = card1Text.match(/"id":"([^"]+)"/);
    
    if (card1Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: card1Match[1], r: lightGreen.r, g: lightGreen.g, b: lightGreen.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: card1Match[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: card1Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    console.log('   ✅ Card Background (hellgrün)');
    
    // Badge "Empfohlen"
    const badge = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 40, y: y + 236, width: 90, height: 22, name: 'S4_BadgeEmpf' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const badgeText = badge.content[0]?.text || '';
    const badgeMatch = badgeText.match(/"id":"([^"]+)"/);
    
    if (badgeMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: badgeMatch[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: badgeMatch[1], radius: 12 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 48, y: y + 239, text: 'Empfohlen', fontSize: 11, name: 'S4_BadgeTxt' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ Badge "Empfohlen"');
    
    // Icon Platzhalter (großer Kreis)
    const iconAR = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 40, y: y + 270, width: 60, height: 60, name: 'S4_IconAR' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const iconARText = iconAR.content[0]?.text || '';
    const iconARMatch = iconARText.match(/"id":"([^"]+)"/);
    
    if (iconARMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: iconARMatch[1], r: green.r, g: green.g, b: green.b, a: 0.2 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: iconARMatch[1], radius: 30 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 55, y: y + 290, text: '📱', fontSize: 28, name: 'S4_IconAREmoji' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ AR-Icon');
    
    // Titel AR
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 110, y: y + 278, text: 'AR-Scan starten', fontSize: 18, name: 'S4_ARTitel' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 110, y: y + 302, text: 'Dauert ca. 1-2 Min.', fontSize: 12, name: 'S4_ARHint' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ AR-Titel & Hint');
    
    // Beschreibung
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 345, text: 'Vermesse deinen Garten per', fontSize: 14, name: 'S4_ARDesc1' }
    });
    await new Promise(r => setTimeout(r, 100));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 362, text: 'Smartphone. Wir erkennen Fläche,', fontSize: 14, name: 'S4_ARDesc2' }
    });
    await new Promise(r => setTimeout(r, 100));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 379, text: 'Maße und Proportionen.', fontSize: 14, name: 'S4_ARDesc3' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ AR-Beschreibung\n');
    
    // Card 2: Fotos
    console.log('📦 Card 2: Fotos...\n');
    
    const card2 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 440, width: 342, height: 180, name: 'S4_CardFotos' }
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
        name: 'set_corner_radius',
        arguments: { nodeId: card2Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    console.log('   ✅ Card Background');
    
    // Icon Foto
    const iconFoto = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 40, y: y + 456, width: 50, height: 50, name: 'S4_IconFoto' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const iconFotoText = iconFoto.content[0]?.text || '';
    const iconFotoMatch = iconFotoText.match(/"id":"([^"]+)"/);
    
    if (iconFotoMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: iconFotoMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 0.3 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: iconFotoMatch[1], radius: 25 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 54, y: y + 472, text: '📷', fontSize: 24, name: 'S4_IconFotoEmoji' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ Foto-Icon');
    
    // Titel Fotos
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 100, y: y + 467, text: 'Fotos hinzufügen', fontSize: 18, name: 'S4_FotoTitel' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 100, y: y + 490, text: 'Verschiedene Perspektiven', fontSize: 12, name: 'S4_FotoHint' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ Foto-Titel');
    
    // Beschreibung
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 525, text: 'Lade Fotos hoch oder nimm neue auf.', fontSize: 14, name: 'S4_FotoDesc' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Foto-Beschreibung');
    
    // Buttons in Card 2
    const btnAufnehmen = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 40, y: y + 560, width: 145, height: 40, name: 'S4_BtnAufnehmen' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const btnAufnText = btnAufnehmen.content[0]?.text || '';
    const btnAufnMatch = btnAufnText.match(/"id":"([^"]+)"/);
    
    if (btnAufnMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: btnAufnMatch[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: btnAufnMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: btnAufnMatch[1], radius: 20 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 60, y: y + 571, text: 'Aufnehmen', fontSize: 13, name: 'S4_TxtAufn' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Button "Aufnehmen"');
    
    const btnHochladen = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 195, y: y + 560, width: 145, height: 40, name: 'S4_BtnHochladen' }
    });
    await new Promise(r => setTimeout(r, 200));
    
    const btnHochText = btnHochladen.content[0]?.text || '';
    const btnHochMatch = btnHochText.match(/"id":"([^"]+)"/);
    
    if (btnHochMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: btnHochMatch[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: btnHochMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: btnHochMatch[1], radius: 20 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 215, y: y + 571, text: 'Hochladen', fontSize: 13, name: 'S4_TxtHoch' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Button "Hochladen"\n');
    
    // Footer Buttons
    console.log('🔘 Footer Buttons...\n');
    
    const btnBack = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 754, width: 155, height: 56, name: 'S4_BtnBack' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const btnBackText = btnBack.content[0]?.text || '';
    const btnBackMatch = btnBackText.match(/"id":"([^"]+)"/);
    
    if (btnBackMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: btnBackMatch[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: btnBackMatch[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: btnBackMatch[1], radius: 50 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 70, y: y + 772, text: 'Zurück', fontSize: 16, name: 'S4_TxtBack' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Zurück');
    
    const btnNext = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 195, y: y + 754, width: 171, height: 56, name: 'S4_BtnNext' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const btnNextText = btnNext.content[0]?.text || '';
    const btnNextMatch = btnNextText.match(/"id":"([^"]+)"/);
    
    if (btnNextMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: btnNextMatch[1], r: green.r, g: green.g, b: green.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: btnNextMatch[1], radius: 50 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 255, y: y + 772, text: 'Weiter', fontSize: 16, name: 'S4_TxtNext' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Weiter\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 SCHRITT 4 ERSTELLT!\n');
    console.log('📍 Position: X:4050, Y:20');
    console.log('📏 Größe: 390×844px');
    console.log('🔍 Layer: "📸 SCHRITT 4 - Fläche erfassen"\n');
    console.log('✅ Inhalt:');
    console.log('   • Progress Bar: Schritt 4/5 (80%)');
    console.log('   • Card 1: AR-Scan (empfohlen, hellgrün)');
    console.log('   • Card 2: Fotos hinzufügen');
    console.log('   • Buttons: Zurück + Weiter\n');
    
  } catch (error) {
    console.error('\n❌ Fehler:', error.message);
  } finally {
    await client.close();
  }
}

createStep4();
