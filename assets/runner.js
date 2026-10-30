
const fs = require('fs');
const path = require('path');

const items = [{'id': 'hero_mockup', 'size': '1536x1024', 'prompt': "Ultra-premium commercial hero product bundle mockup for a medical education product.\nScene: A clean, elegant, modern nursing student desk illuminated by natural soft hospital window light.\nCenter: A sleek metallic iPad Pro standing upright displaying the prestigious navy blue medical cover titled 'PHARMACOLOGIE CLINIQUE & SOINS INFIRMIERS'.\nNext to it: A stack of beautifully printed, full-color glossy laminated medical revision flashcards with vibrant 3D anatomical illustrations visible (liver, heart, neuron).\nSurrounding authentic props: A real Littmann stethoscope in deep navy blue, a pocket medical penlight, a clean white nurse blouse pocket with a watch, and a subtle modern cup of coffee.\nStyle: High-end commercial studio photography, crisp 8k resolution, elegant depth of field, photorealistic lighting, medical luxury aesthetic. No watermarks."}, {'id': 'basic_card_mockup', 'size': '1024x1024', 'prompt': "Commercial 3D product mockup for 'PACK ESSENTIEL IFSI' (Basic Edition).\nLayout: A neat stack of 50 full-color printed medical study cards in a clean clear acrylic desk organizer box, accompanied by a clean digital tablet showing the PDF version.\nText clearly readable on card header: '50 FICHES ESSENTIELLES UE 2.11'.\nColor palette: Professional medical cyan, soft blue and crisp white background.\nAtmosphere: Clean, minimalist, high quality educational product photography, studio lighting, photorealistic."}, {'id': 'premium_card_mockup', 'size': '1024x1024', 'prompt': "Commercial luxury product bundle mockup for 'PACK RÉUSSITE TOTALE IFSI' (Premium Edition).\nLayout: A massive, impressive complete bundle presentation.\nItems included:\n1. iPad Pro displaying the interactive digital edition with clickable index tabs.\n2. A thick, elegant boxed set of +120 full-color laminated study flashcards with color-coded edge tabs.\n3. A compact spiral-bound pocket guide ('Format Poche de Blouse').\n4. A luxury navy blue embossed box case.\nLighting: Warm golden highlights mixed with clinical cyan glow, floating subtle badge 'ÉDITION COMPLÈTE & VITALICE'. Photorealistic commercial showcase."}, {'id': 'hotmart_product_square', 'size': '1024x1024', 'prompt': "Square 1024x1024 e-commerce product box mockup for Hotmart checkout page.\nSubject: A pristine 3D digital software/book box standing on a reflective white medical pedestal.\nCover on the box: Deep navy and teal medical atlas cover with title 'PHARMACOLOGIE CLINIQUE IFSI' and a glowing 3D human torso.\nTo the side: An elegant iPad showing an anatomical pharmacology flashcard.\nBackground: Clean neutral studio backdrop with soft blue backlight. Clean, trustworthy, ultra-professional."}, {'id': 'bump1_calculs_doses', 'size': '1024x1024', 'prompt': "Square 1024x1024 order bump product mockup.\nTitle: 'GUIDE ULTIME : CALCULS DE DOSES & DÉBITS'.\nVisual: A sleek spiral pocket handbook resting next to a medical IV drip chamber and a precision electric syringe pump.\nCover of handbook: Clean white and cyan medical design with infusion formulas and syringe graphic.\nSubtext on cover: 'Méthode Zéro Erreur IFSI'. Clean isolated product shot on soft gradient background."}, {'id': 'bump2_normes_biologiques', 'size': '1024x1024', 'prompt': "Square 1024x1024 order bump product mockup.\nTitle: 'MÉMOS EXPRESS : NORMES BIOLOGIQUES'.\nVisual: A compact set of fan-shaped laminated pocket reference cards on a ring clip, with colorful lab test tubes (purple, red, green EDTA tubes) arranged neatly next to it.\nCover of cards: 'Normes Bio & Bilans Sanguins'. Crisp, modern, practical nursing tool."}, {'id': 'bump3_antidotes', 'size': '1024x1024', 'prompt': "Square 1024x1024 order bump product mockup.\nTitle: 'GUIDE D'URGENCE : LES ANTIDOTES INDISPENSABLES'.\nVisual: A red and white emergency pocket guide booklet with a sleek medical cross icon, sitting next to a glass ampoule of Naloxone and medical vial.\nCover of booklet: 'Antidotes & Protocoles d'Intoxication'. High-contrast emergency healthcare aesthetic."}, {'id': 'bump4_checklists_5b', 'size': '1024x1024', 'prompt': "Square 1024x1024 order bump product mockup.\nTitle: 'CHECKLISTS CLINIQUES : LA RÈGLE DES 5B'.\nVisual: A durable medical acrylic clipboard with engraved gold clip, holding clean waterproof checklist sheets with checkboxes and 5B safety icons (Bon patient, Bon médicament, etc.).\nCrisp clinical photography, clean bright medical aesthetic."}, {'id': 'bump5_combo', 'size': '1024x1024', 'prompt': "Square 1024x1024 order bump product mockup for the complete 4-in-1 Combo Pack.\nTitle: 'PACK INTÉGRAL SOIGNANT : LES 4 GUIDES CLINIQUES'.\nVisual: An attractive bundle showing all 4 companion pocket guides arranged harmoniously together (Calculs de doses, Normes bio, Antidotes, Checklists 5B).\nA subtle ribbon or badge: 'PACK COMPLET - ÉCONOMIE 60%'. High perceived value, clean e-commerce presentation."}];
const outDir = 'D:\\CLIENTES\\FICHAS FARMACOLOGIA FRANCIA\\demo\\mockups';

async function main() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const outPath = path.join(outDir, item.id + '.png');
    if (fs.existsSync(outPath)) {
      console.log('Skipping already existing:', item.id);
      continue;
    }
    console.log(`Generating [${i+1}/${items.length}] ${item.id}...`);
    try {
      const res = await tools.image_gen__imagegen({
        prompt: item.prompt,
        size: item.size
      });
      if (res && res.result) {
        const b64 = res.result.b64_json || res.result.image_data || (res.result.images && res.result.images[0]);
        if (b64) {
          fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
          console.log(`Saved ${item.id} successfully!`);
        }
      }
    } catch (err) {
      console.error(`Error generating ${item.id}:`, err.message);
    }
  }
}

main().catch(err => {
  console.error("Main error:", err);
  process.exit(1);
});
