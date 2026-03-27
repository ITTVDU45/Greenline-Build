import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function checkPlugin() {
  const transport = new StdioClientTransport({
    command: '/Users/tolgahanvardar/.bun/bin/bun',
    args: ['run', '/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/src/talk_to_figma_mcp/server.ts']
  });
  
  const client = new Client({ name: 'check-plugin', version: '1.0.0' }, { capabilities: {} });
  
  try {
    await client.connect(transport);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔗 VERBINDE MIT FIGMA...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📡 Channel: oguqppbm');
    await client.callTool({ name: 'join_channel', arguments: { channel: 'oguqppbm' } });
    await new Promise(r => setTimeout(r, 3000));
    
    console.log('✅ WebSocket-Verbindung hergestellt!\n');
    console.log('📊 Teste Plugin-Kommunikation...\n');
    
    // Einfacher Test: Erstelle ein kleines Rechteck
    const testRect = await client.callTool({ 
      name: 'create_rectangle', 
      arguments: { 
        x: 100, 
        y: 100, 
        width: 100, 
        height: 100, 
        name: '🧪 Plugin-Test' 
      } 
    });
    
    if (testRect && testRect.content && testRect.content[0]) {
      const result = testRect.content[0].text;
      console.log('✅ Plugin antwortet!');
      console.log(`📦 Antwort: ${result.substring(0, 100)}...\n`);
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ FIGMA-PLUGIN IST AKTIV UND FUNKTIONIERT!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('💡 Du kannst jetzt Screens erstellen.\n');
    } else {
      console.log('⚠️  Plugin antwortet nicht wie erwartet.');
      console.log('📊 Antwort:', JSON.stringify(testRect, null, 2));
    }
    
  } catch (e: any) {
    console.error('\n❌ Fehler:', e.message);
    console.error('\n⚠️  PLUGIN NICHT VERBUNDEN!\n');
    console.error('📋 BITTE PRÜFE IN FIGMA:');
    console.error('   1. Öffne Figma');
    console.error('   2. Gehe zu: Plugins → "Talk to Figma"');
    console.error('   3. Stelle sicher, dass der Channel "oguqppbm" eingestellt ist');
    console.error('   4. Das Plugin sollte im Hintergrund laufen\n');
  } finally {
    await client.close();
  }
}

checkPlugin();

