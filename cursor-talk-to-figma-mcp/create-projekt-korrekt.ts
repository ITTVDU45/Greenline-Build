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

async function createProjektKorrekt() {
  const transport = new StdioClientTransport({
    command: '/Users/tolgahanvardar/.bun/bin/bun',
    args: ['run', '/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/src/talk_to_figma_mcp/server.ts']
  });
  
  const client = new Client({
    name: 'projekt-korrekt',
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
    console.log('🎯 Erstelle Screen an EXAKTER Position...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📍 EXAKTE Position:');
    console.log('   X: 3060 (rechts neben 2570)');
    console.log('   Y: 20\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const green = hexToRgb('#1F7A4D');
    const borderGray = { r: 0.88, g: 0.88, b: 0.88 };
    
    // EXAKTE Position wie gewünscht
    const x = 3060;
    const y = 20;
    const w = 390;
    const h = 844;
    
    console.log('📱 Erstelle "PROJEKT ERSTELLEN"...\n');
    
    // Background
    const bg = await client.callTool({
      name: 'create_rectangle',
      arguments: { x, y, width: w, height: h, name: '✅ PROJEKT ERSTELLEN (X3060)' }
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
    
    // Header
    const header = await client.callTool({
      name: 'create_rectangle',
      arguments: { x, y, width: w, height: 72, name: 'PE_Header' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const headerText = header.content[0]?.text || '';
    const headerMatch = headerText.match(/"id":"([^"]+)"/);
    
    if (headerMatch) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: headerMatch[1], r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 24, y: y + 26, text: 'Neues Projekt', fontSize: 20, name: 'PE_HeaderText' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ Header "Neues Projekt"');
    
    // Titel
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 24, y: y + 100, text: 'Projektdaten', fontSize: 28, name: 'PE_Titel' }
    });
    await new Promise(r => setTimeout(r, 150));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 24, y: y + 140, text: 'Bitte fülle die folgenden Felder aus', fontSize: 16, name: 'PE_Subtitle' }
    });
    await new Promise(r => setTimeout(r, 150));
    console.log('   ✅ Titel & Untertitel\n');
    
    // Card 1: Projektname
    console.log('📦 Cards...\n');
    
    const c1 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 190, width: 342, height: 80, name: 'PE_CardName' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const c1Text = c1.content[0]?.text || '';
    const c1Match = c1Text.match(/"id":"([^"]+)"/);
    
    if (c1Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: c1Match[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: c1Match[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: c1Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 206, text: 'Projektname *', fontSize: 14, name: 'PE_LblName' }
    });
    await new Promise(r => setTimeout(r, 100));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 232, text: 'z.B. "Garten Müller"', fontSize: 16, name: 'PE_InpName' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Projektname');
    
    // Card 2: Straße
    const c2 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 290, width: 342, height: 80, name: 'PE_CardStrasse' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const c2Text = c2.content[0]?.text || '';
    const c2Match = c2Text.match(/"id":"([^"]+)"/);
    
    if (c2Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: c2Match[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: c2Match[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: c2Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 306, text: 'Straße & Hausnummer *', fontSize: 14, name: 'PE_LblStr' }
    });
    await new Promise(r => setTimeout(r, 100));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 332, text: 'z.B. Musterstraße 123', fontSize: 16, name: 'PE_InpStr' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Straße');
    
    // Card 3 & 4: PLZ & Ort
    const c3 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 390, width: 150, height: 80, name: 'PE_CardPLZ' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const c3Text = c3.content[0]?.text || '';
    const c3Match = c3Text.match(/"id":"([^"]+)"/);
    
    if (c3Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: c3Match[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: c3Match[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: c3Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 406, text: 'PLZ *', fontSize: 14, name: 'PE_LblPLZ' }
    });
    await new Promise(r => setTimeout(r, 100));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 432, text: '12345', fontSize: 16, name: 'PE_InpPLZ' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ PLZ');
    
    const c4 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 190, y: y + 390, width: 176, height: 80, name: 'PE_CardOrt' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const c4Text = c4.content[0]?.text || '';
    const c4Match = c4Text.match(/"id":"([^"]+)"/);
    
    if (c4Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: c4Match[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: c4Match[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: c4Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 206, y: y + 406, text: 'Ort *', fontSize: 14, name: 'PE_LblOrt' }
    });
    await new Promise(r => setTimeout(r, 100));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 206, y: y + 432, text: 'Berlin', fontSize: 16, name: 'PE_InpOrt' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Ort');
    
    // Card 5: Land
    const c5 = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 490, width: 342, height: 80, name: 'PE_CardLand' }
    });
    await new Promise(r => setTimeout(r, 250));
    
    const c5Text = c5.content[0]?.text || '';
    const c5Match = c5Text.match(/"id":"([^"]+)"/);
    
    if (c5Match) {
      await client.callTool({
        name: 'set_fill_color',
        arguments: { nodeId: c5Match[1], r: 0.98, g: 0.98, b: 0.98, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_stroke_color',
        arguments: { nodeId: c5Match[1], r: borderGray.r, g: borderGray.g, b: borderGray.b, a: 1.0 }
      });
      await new Promise(r => setTimeout(r, 150));
      
      await client.callTool({
        name: 'set_corner_radius',
        arguments: { nodeId: c5Match[1], radius: 16 }
      });
      await new Promise(r => setTimeout(r, 150));
    }
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 506, text: 'Land *', fontSize: 14, name: 'PE_LblLand' }
    });
    await new Promise(r => setTimeout(r, 100));
    
    await client.callTool({
      name: 'create_text',
      arguments: { x: x + 40, y: y + 532, text: 'Deutschland', fontSize: 16, name: 'PE_InpLand' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Land\n');
    
    // Buttons
    console.log('🔘 Buttons...\n');
    
    const btnBack = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 24, y: y + 754, width: 155, height: 56, name: 'PE_BtnBack' }
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
      arguments: { x: x + 55, y: y + 772, text: 'Abbrechen', fontSize: 16, name: 'PE_TxtBack' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Abbrechen');
    
    const btnNext = await client.callTool({
      name: 'create_rectangle',
      arguments: { x: x + 195, y: y + 754, width: 171, height: 56, name: 'PE_BtnNext' }
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
      arguments: { x: x + 255, y: y + 772, text: 'Weiter', fontSize: 16, name: 'PE_TxtNext' }
    });
    await new Promise(r => setTimeout(r, 100));
    console.log('   ✅ Weiter\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 FERTIG!\n');
    console.log('📍 EXAKTE Position:');
    console.log(`   X: ${x}`);
    console.log(`   Y: ${y}`);
    console.log('📏 Größe: 390×844px\n');
    console.log('🔍 Layer-Name: "✅ PROJEKT ERSTELLEN (X3060)"\n');
    console.log('✅ Der Screen ist jetzt rechts neben X:2570\n');
    
  } catch (error) {
    console.error('\n❌ Fehler:', error.message);
  } finally {
    await client.close();
  }
}

createProjektKorrekt();
