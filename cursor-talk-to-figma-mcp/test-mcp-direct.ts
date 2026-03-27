import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function testMCPConnection() {
  console.log('🔄 Starte MCP Client...');
  
  const transport = new StdioClientTransport({
    command: '/Users/tolgahanvardar/.bun/bin/bun',
    args: ['run', '/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/src/talk_to_figma_mcp/server.ts']
  });
  
  const client = new Client({
    name: 'test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });
  
  try {
    await client.connect(transport);
    console.log('✅ MCP Client verbunden!');
    
    // Liste verfügbare Tools
    const tools = await client.listTools();
    console.log('\n📋 Verfügbare Tools:', tools.tools.length);
    console.log('Erste 5 Tools:', tools.tools.slice(0, 5).map(t => t.name));
    
    // Versuche join_channel
    console.log('\n🔗 Versuche join_channel mit swnqypw4...');
    const result = await client.callTool({
      name: 'join_channel',
      arguments: {
        channel: 'swnqypw4'
      }
    });
    
    console.log('✅ join_channel Ergebnis:', JSON.stringify(result, null, 2));
    
    // Warte kurz
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Versuche get_document_info
    console.log('\n📄 Versuche get_document_info...');
    const docInfo = await client.callTool({
      name: 'get_document_info',
      arguments: {}
    });
    
    console.log('✅ Dokument Info:', JSON.stringify(docInfo, null, 2));
    
  } catch (error) {
    console.error('❌ Fehler:', error);
  } finally {
    await client.close();
    console.log('\n🔌 Verbindung geschlossen');
  }
}

testMCPConnection();
