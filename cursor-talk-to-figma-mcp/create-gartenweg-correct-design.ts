import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const CHANNEL = 'zh3drv84';
const BASE_X = 7000;
const BASE_Y = 20;

async function callTool(client: any, name: string, args: any): Promise<any> {
  try {
    const result = await client.callTool({ name, arguments: args });
    if (result.content && result.content[0] && result.content[0].text) {
      try {
        return JSON.parse(result.content[0].text);
      } catch {
        return { success: true, raw: result.content[0].text };
      }
    }
    return { success: true };
  } catch (e: any) {
    console.error(`⚠️  ${name}: ${e.message}`);
    return { success: false, error: e.message };
  }
}

async function createGartenwegScreen() {
  const transport = new StdioClientTransport({
    command: '/Users/tolgahanvardar/.bun/bin/bun',
    args: ['run', '/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/src/talk_to_figma_mcp/server.ts']
  });
  
  const client = new Client({ name: 'gartenweg-creator', version: '1.0.0' }, { capabilities: {} });
  
  try {
    await client.connect(transport);
    await callTool(client, 'join_channel', { channel: CHANNEL });
    await new Promise(r => setTimeout(r, 1000));
    console.log('✅ Verbunden\n');

    // Lösche alte Version
    console.log('🧹 Lösche alten Screen...');
    const doc = await callTool(client, 'get_document_info', {});
    const oldNodes = doc.children?.filter((c: any) => 
      c.name?.includes('GARTENWEG') || c.name?.startsWith('GW_') || 
      c.name?.includes('Card_Pflasterweg') || c.name?.includes('Card_Natursteinweg')
    ).map((c: any) => c.id) || [];
    
    if (oldNodes.length > 0) {
      console.log(`  Lösche ${oldNodes.length} alte Elemente...`);
      await callTool(client, 'delete_multiple_nodes', { nodeIds: oldNodes });
      await new Promise(r => setTimeout(r, 500));
    }

    // Screen Hintergrund (wie S5)
    console.log('📱 Erstelle Screen...');
    const bg = await callTool(client, 'create_rectangle', {
      x: BASE_X, y: BASE_Y, width: 4500, height: 9000,
      name: '🛤️ GARTENWEG - Details'
    });
    if (bg.id) await callTool(client, 'set_fill_color', { nodeId: bg.id, r: 0.97, g: 0.98, b: 0.99, a: 1 });

    // Header (wie bei Bepflanzung-Detail)
    const arrow = await callTool(client, 'create_text', {
      x: BASE_X + 180, y: BASE_Y + 180, text: '←', name: 'BackArrow', fontSize: 96
    });
    if (arrow.id) await callTool(client, 'set_fill_color', { nodeId: arrow.id, r: 0.2, g: 0.2, b: 0.2, a: 1 });

    const breadcrumb = await callTool(client, 'create_text', {
      x: BASE_X + 340, y: BASE_Y + 200, text: 'Features → Gartenweg', name: 'Breadcrumb', fontSize: 48
    });
    if (breadcrumb.id) await callTool(client, 'set_fill_color', { nodeId: breadcrumb.id, r: 0.5, g: 0.5, b: 0.5, a: 1 });

    const title = await callTool(client, 'create_text', {
      x: BASE_X + 180, y: BASE_Y + 400, text: 'Gartenweg-Optionen', name: 'Titel', fontSize: 112, fontWeight: 700
    });
    if (title.id) await callTool(client, 'set_fill_color', { nodeId: title.id, r: 0.1, g: 0.1, b: 0.1, a: 1 });

    const subtitle = await callTool(client, 'create_text', {
      x: BASE_X + 180, y: BASE_Y + 580, text: 'Wählen Sie die passenden Optionen für Ihr Projekt',
      name: 'Subtitel', fontSize: 56
    });
    if (subtitle.id) await callTool(client, 'set_fill_color', { nodeId: subtitle.id, r: 0.4, g: 0.4, b: 0.4, a: 1 });

    const hint = await callTool(client, 'create_text', {
      x: BASE_X + 180, y: BASE_Y + 720, text: '← Wischen Sie nach links/rechts →',
      name: 'SwipeHint', fontSize: 42, fontWeight: 300
    });
    if (hint.id) await callTool(client, 'set_fill_color', { nodeId: hint.id, r: 0.6, g: 0.6, b: 0.6, a: 1 });

    // Cards (wie Plant_* Cards - dünn, nebeneinander)
    console.log('🎨 Erstelle Cards (Swipe-Layout)...');
    const cards = [
      { id: 'Pflasterweg', emoji: '🧱', title: 'Pflasterweg', desc1: 'Klassisch, robust und', desc2: 'vielseitig einsetzbar', badge: 'langlebig', hint1: 'Hauptwege, Einfahrten,', hint2: 'Hauseingänge', x: 180 },
      { id: 'Natursteinweg', emoji: '🪨', title: 'Natursteinweg', desc1: 'Hochwertig, natürlich &', desc2: 'individuell', badge: 'Premium', hint1: 'Höherer Preis,', hint2: 'sehr langlebig', x: 1120 },
      { id: 'Kiesweg', emoji: '⚪', title: 'Kiesweg', desc1: 'Natürlich, günstig &', desc2: 'wasserdurchlässig', badge: 'preiswert', hint1: 'Nebenwege,', hint2: 'regelmäßige Pflege', x: 2060 },
      { id: 'Plattenweg', emoji: '◼️', title: 'Plattenweg', desc1: 'Modern, eben &', desc2: 'klar strukturiert', badge: 'modern', hint1: 'Terrassennähe,', hint2: 'klare Linien', x: 3000 },
      { id: 'Rindenmulch', emoji: '🌰', title: 'Rindenmulch-Weg', desc1: 'Weich, natürlich &', desc2: 'ideal für Gartenpfade', badge: 'weich', hint1: 'Nicht für', hint2: 'Hauptwege', x: 180 },
      { id: 'Betonweg', emoji: '⬜', title: 'Betonweg', desc1: 'Pflegeleicht &', desc2: 'funktional', badge: 'stabil', hint1: 'Funktionale Bereiche,', hint2: 'moderne Gärten', x: 1120 },
      { id: 'Holzweg', emoji: '🪵', title: 'Holz-/Stegweg', desc1: 'Warm, natürlich &', desc2: 'ideal für besondere Bereiche', badge: 'natürlich', hint1: 'Teich, Feuchtbereiche', hint2: 'Pflege erforderlich', x: 2060 }
    ];

    let currentY = 900;
    let cardsInRow = 0;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      
      // Neue Zeile nach 4 Cards
      if (cardsInRow >= 4) {
        currentY += 1680;
        cardsInRow = 0;
      }
      
      const cx = BASE_X + card.x;
      const cy = BASE_Y + currentY;
      
      console.log(`  → ${card.title} (${cardsInRow + 1}/Zeile)`);
      
      // Card BG (dünn wie Plant-Cards: 860x1500)
      const cardBg = await callTool(client, 'create_rectangle', {
        x: cx, y: cy, width: 860, height: 1500, name: `Weg_${card.id}`
      });
      if (cardBg.id) {
        await callTool(client, 'set_fill_color', { nodeId: cardBg.id, r: 1, g: 1, b: 1, a: 1 });
        await callTool(client, 'set_corner_radius', { nodeId: cardBg.id, radius: 32 });
        await callTool(client, 'set_stroke_color', { nodeId: cardBg.id, r: 0.9, g: 0.9, b: 0.9, a: 1, weight: 2 });
      }

      // Icon BG
      const iconBg = await callTool(client, 'create_rectangle', {
        x: cx + 80, y: cy + 80, width: 140, height: 140, name: `Icon_${card.id}`
      });
      if (iconBg.id) {
        await callTool(client, 'set_fill_color', { nodeId: iconBg.id, r: 0.95, g: 0.97, b: 0.99, a: 1 });
        await callTool(client, 'set_corner_radius', { nodeId: iconBg.id, radius: 20 });
      }

      // Emoji
      await callTool(client, 'create_text', {
        x: cx + 105, y: cy + 95, text: card.emoji, fontSize: 72, name: `Emoji_${card.id}`
      });

      // Toggle
      const toggle = await callTool(client, 'create_rectangle', {
        x: cx + 580, y: cy + 80, width: 200, height: 140, name: `Toggle_${card.id}`
      });
      if (toggle.id) {
        await callTool(client, 'set_fill_color', { nodeId: toggle.id, r: 0.9, g: 0.9, b: 0.9, a: 1 });
        await callTool(client, 'set_corner_radius', { nodeId: toggle.id, radius: 70 });
      }

      const toggleTxt = await callTool(client, 'create_text', {
        x: cx + 630, y: cy + 112, text: 'Aus', fontSize: 52, fontWeight: 500, name: `ToggleTxt_${card.id}`
      });
      if (toggleTxt.id) await callTool(client, 'set_fill_color', { nodeId: toggleTxt.id, r: 0.5, g: 0.5, b: 0.5, a: 1 });

      // Titel
      const ctitle = await callTool(client, 'create_text', {
        x: cx + 80, y: cy + 270, text: card.title, fontSize: 64, fontWeight: 600, name: `Title_${card.id}`
      });
      if (ctitle.id) await callTool(client, 'set_fill_color', { nodeId: ctitle.id, r: 0.1, g: 0.1, b: 0.1, a: 1 });

      // Beschreibung
      const desc1 = await callTool(client, 'create_text', {
        x: cx + 80, y: cy + 370, text: card.desc1, fontSize: 44, name: `Desc1_${card.id}`
      });
      if (desc1.id) await callTool(client, 'set_fill_color', { nodeId: desc1.id, r: 0.4, g: 0.4, b: 0.4, a: 1 });

      if (card.desc2) {
        const desc2 = await callTool(client, 'create_text', {
          x: cx + 80, y: cy + 430, text: card.desc2, fontSize: 44, name: `Desc2_${card.id}`
        });
        if (desc2.id) await callTool(client, 'set_fill_color', { nodeId: desc2.id, r: 0.4, g: 0.4, b: 0.4, a: 1 });
      }

      // Badge
      const badge = await callTool(client, 'create_rectangle', {
        x: cx + 80, y: cy + 540, width: 240, height: 70, name: `Badge_${card.id}`
      });
      if (badge.id) {
        await callTool(client, 'set_fill_color', { nodeId: badge.id, r: 0.2, g: 0.7, b: 0.4, a: 0.15 });
        await callTool(client, 'set_corner_radius', { nodeId: badge.id, radius: 16 });
      }

      const badgeTxt = await callTool(client, 'create_text', {
        x: cx + 110, y: cy + 554, text: card.badge, fontSize: 38, fontWeight: 500, name: `BadgeTxt_${card.id}`
      });
      if (badgeTxt.id) await callTool(client, 'set_fill_color', { nodeId: badgeTxt.id, r: 0.2, g: 0.6, b: 0.3, a: 1 });

      // Hinweise
      const hint1 = await callTool(client, 'create_text', {
        x: cx + 80, y: cy + 660, text: card.hint1, fontSize: 40, fontWeight: 300, name: `Hint1_${card.id}`
      });
      if (hint1.id) await callTool(client, 'set_fill_color', { nodeId: hint1.id, r: 0.5, g: 0.5, b: 0.5, a: 1 });

      if (card.hint2) {
        const hint2 = await callTool(client, 'create_text', {
          x: cx + 80, y: cy + 710, text: card.hint2, fontSize: 40, fontWeight: 300, name: `Hint2_${card.id}`
        });
        if (hint2.id) await callTool(client, 'set_fill_color', { nodeId: hint2.id, r: 0.5, g: 0.5, b: 0.5, a: 1 });
      }

      cardsInRow++;
    }

    // Footer (wie S5)
    console.log('📊 Erstelle Footer...');
    const footerY = BASE_Y + 8300;
    
    const prog = await callTool(client, 'create_text', {
      x: BASE_X + 180, y: footerY, text: 'Schritt 6 von 5 (Details)', fontSize: 48, name: 'S6_Prog'
    });
    if (prog.id) await callTool(client, 'set_fill_color', { nodeId: prog.id, r: 0.5, g: 0.5, b: 0.5, a: 1 });

    const progBg = await callTool(client, 'create_rectangle', {
      x: BASE_X + 180, y: footerY + 100, width: 4140, height: 20, name: 'S6_PBG'
    });
    if (progBg.id) {
      await callTool(client, 'set_fill_color', { nodeId: progBg.id, r: 0.9, g: 0.9, b: 0.9, a: 1 });
      await callTool(client, 'set_corner_radius', { nodeId: progBg.id, radius: 10 });
    }

    const progActive = await callTool(client, 'create_rectangle', {
      x: BASE_X + 180, y: footerY + 100, width: 4140, height: 20, name: 'S6_PAct'
    });
    if (progActive.id) {
      await callTool(client, 'set_fill_color', { nodeId: progActive.id, r: 0.2, g: 0.7, b: 0.4, a: 1 });
      await callTool(client, 'set_corner_radius', { nodeId: progActive.id, radius: 10 });
    }

    const btnBack = await callTool(client, 'create_rectangle', {
      x: BASE_X + 180, y: footerY + 220, width: 2000, height: 280, name: 'S6_BtnBack'
    });
    if (btnBack.id) {
      await callTool(client, 'set_fill_color', { nodeId: btnBack.id, r: 0.95, g: 0.95, b: 0.95, a: 1 });
      await callTool(client, 'set_corner_radius', { nodeId: btnBack.id, radius: 32 });
      await callTool(client, 'set_stroke_color', { nodeId: btnBack.id, r: 0.8, g: 0.8, b: 0.8, a: 1, weight: 2 });
    }

    const txtBack = await callTool(client, 'create_text', {
      x: BASE_X + 900, y: footerY + 300, text: 'Zurück', fontSize: 64, fontWeight: 600, name: 'S6_TxtBack'
    });
    if (txtBack.id) await callTool(client, 'set_fill_color', { nodeId: txtBack.id, r: 0.3, g: 0.3, b: 0.3, a: 1 });

    const btnNext = await callTool(client, 'create_rectangle', {
      x: BASE_X + 2320, y: footerY + 220, width: 2000, height: 280, name: 'S6_BtnNext'
    });
    if (btnNext.id) {
      await callTool(client, 'set_fill_color', { nodeId: btnNext.id, r: 0.2, g: 0.7, b: 0.4, a: 1 });
      await callTool(client, 'set_corner_radius', { nodeId: btnNext.id, radius: 32 });
    }

    const txtNext = await callTool(client, 'create_text', {
      x: BASE_X + 3040, y: footerY + 300, text: 'Weiter', fontSize: 64, fontWeight: 600, name: 'S6_TxtNext'
    });
    if (txtNext.id) await callTool(client, 'set_fill_color', { nodeId: txtNext.id, r: 1, g: 1, b: 1, a: 1 });

    console.log('\n✅ Gartenweg-Screen im richtigen Design erstellt!');
    console.log(`📍 Position: x=${BASE_X}, y=${BASE_Y}`);
    console.log(`🎨 7 Cards im Swipe-Layout (wie Bepflanzung-Details)\n`);
    
  } catch (e: any) {
    console.error('❌ Fehler:', e.message);
  } finally {
    await client.close();
  }
}

createGartenwegScreen();

