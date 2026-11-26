// Arkcov Atlas: Blood & Bone Marrow.
// Every topic connects five layers (anatomy, physiology, histology, pathology,
// clinical) at three depths (cadet, college, medical). Pathology entries carry
// a "mechanism thread" that walks from root cause to what the patient feels,
// and link to Case Library cases by code.

export const LEVELS = [
  { id: 'cadet', label: 'Cadet', note: 'Grades 6–12' },
  { id: 'college', label: 'College', note: 'Undergraduate' },
  { id: 'medical', label: 'Medical', note: 'USMLE-level' },
];

export const THREAD = ['Root cause', 'What breaks', 'Under the microscope', 'What the patient feels'];

export const PARTS = {
  marrow_axial: { label: 'Red marrow: skull, spine, ribs, sternum, pelvis', color: '#E8DCC4', focusColor: '#E88A86', glow: '#B3261E', topic: 'bone-marrow' },
  marrow_long: { label: 'Red marrow: upper femur and humerus', color: '#E8DCC4', focusColor: '#E88A86', glow: '#B3261E', topic: 'bone-marrow' },
  skeleton: { label: 'Bones with mostly fatty (yellow) marrow', color: '#E8DCC4', focusColor: '#F2E6C8', topic: 'bone-marrow' },
  spleen: { label: 'Spleen', color: '#8E3B5A', focusColor: '#C2537E', glow: '#7A1E46', organ: true, topic: 'spleen' },
  liver: { label: 'Liver', color: '#8A3D2E', focusColor: '#B85A3F', glow: '#6E2412', organ: true, topic: 'iron' },
  kidneys: { label: 'Kidneys (make erythropoietin)', color: '#8F4436', focusColor: '#C0604A', glow: '#7A2A1A', organ: true, topic: 'red-blood-cells' },
  heart: { label: 'Heart', color: '#A83A3A', focusColor: '#D2554F', glow: '#8A1C1C', organ: true, topic: 'red-blood-cells' },
  aorta: { label: 'Aorta', color: '#B4463E', focusColor: '#DA6258', glow: '#8A1C1C', organ: true, topic: 'red-blood-cells' },
};

export const BLOOD = {
  slug: 'blood',
  name: 'Blood & Bone Marrow',
  model: '/models/blood-body.glb',
  tagline: 'Five liters of living tissue that carries oxygen, fights infection and seals its own leaks.',
  intro: {
    cadet: 'Blood is a tissue, just like muscle or bone, except it flows. It carries oxygen to every cell, brings germ-fighters wherever they’re needed, and plugs leaks when you get hurt. It’s made inside your bones and cleaned by your spleen. When you understand how blood works, you can figure out why a person is tired, pale, bruising or getting sick.',
    college: 'Blood is a connective tissue of cells (erythrocytes, leukocytes, platelets) suspended in plasma. Its cells arise from hematopoietic stem cells in red marrow, are regulated by hormones from the kidney and liver, and are filtered and recycled by the spleen and liver. Disorders of blood make sense when you trace a finding back through production, function and destruction.',
    medical: 'Approach every hematologic problem with three questions: Is production adequate (marrow, nutrients, growth factors)? Is the cell functioning normally (hemoglobin, membrane, receptors, factors)? Is it being lost or destroyed (bleeding, hemolysis, sequestration, consumption)? The reticulocyte count, smear and a few targeted labs usually tell you which branch you are on.',
  },
  topics: [
    {
      slug: 'bone-marrow',
      title: 'Bone Marrow',
      kicker: 'The blood factory',
      summary: 'Where every blood cell is born, and how the factory responds to demand.',
      parts: ['marrow_axial', 'marrow_long'],
      smear: { presets: ['normal', 'leukemia'] },
      widget: {
        type: 'pathway',
        intro: 'Hematopoiesis: one stem cell, many families. Pick a condition to see which branch fails.',
        pathway: {
          title: 'Hematopoiesis tree',
          height: 62,
          nodes: [
            { id: 'hsc', label: 'Stem cell', x: 50, y: 6, desc: 'Hematopoietic stem cells renew themselves and can become any blood cell.' },
            { id: 'epo', label: 'Kidney: EPO', x: 10, y: 18, w: 18, desc: 'When oxygen is low, the kidney releases erythropoietin (EPO), which tells the marrow to make more red cells.' },
            { id: 'cmp', label: 'Myeloid progenitor', x: 36, y: 20, w: 26, desc: 'Gives rise to red cells, platelets, granulocytes and monocytes.' },
            { id: 'clp', label: 'Lymphoid progenitor', x: 76, y: 20, w: 26, desc: 'Gives rise to B cells, T-cell precursors and natural killer cells.' },
            { id: 'ery', label: 'Red cell line', x: 12, y: 36, w: 20, desc: 'Erythroid precursors fill with hemoglobin and eject their nucleus.' },
            { id: 'mega', label: 'Megakaryocyte', x: 36, y: 36, w: 22, desc: 'A giant cell that sheds thousands of platelets into marrow sinusoids.' },
            { id: 'gran', label: 'Granulocyte', x: 58, y: 36, w: 18, desc: 'Precursors of neutrophils, eosinophils and basophils, plus monocytes.' },
            { id: 'bcell', label: 'B cells', x: 76, y: 36, w: 14, desc: 'Make antibodies.' },
            { id: 'tcell', label: 'T cells', x: 92, y: 36, w: 14, desc: 'Mature in the thymus; coordinate and carry out immune attacks.' },
            { id: 'rbc', label: 'Red cells', x: 12, y: 54, w: 18, desc: 'Carry oxygen for about 120 days.' },
            { id: 'plt', label: 'Platelets', x: 36, y: 54, w: 18, desc: 'Plug leaks and start clots; live about 7–10 days.' },
            { id: 'neut', label: 'Neutrophils', x: 58, y: 54, w: 18, desc: 'First responders to bacteria; live hours to days.' },
          ],
          edges: [['hsc', 'cmp'], ['hsc', 'clp'], ['epo', 'ery'], ['cmp', 'ery'], ['cmp', 'mega'], ['cmp', 'gran'], ['clp', 'bcell'], ['clp', 'tcell'], ['ery', 'rbc'], ['mega', 'plt'], ['gran', 'neut']],
          conditions: [
            { id: 'all', label: 'Acute lymphoblastic leukemia', note: 'Lymphoid blasts multiply out of control and crowd out the other families.', states: { clp: 'bad', bcell: 'up', ery: 'down', mega: 'down', gran: 'down', rbc: 'down', plt: 'down', neut: 'down' }, labs: [['Hemoglobin', 'Low', 'down'], ['Platelets', 'Low', 'down'], ['Neutrophils', 'Low', 'down'], ['Blasts in blood', 'Present', 'up']] },
            { id: 'aplastic', label: 'Aplastic anemia', note: 'Stem cells are destroyed or fail, so every family falls together (pancytopenia).', states: { hsc: 'bad', cmp: 'down', clp: 'down', ery: 'down', mega: 'down', gran: 'down', rbc: 'down', plt: 'down', neut: 'down' }, labs: [['All blood counts', 'Low', 'down'], ['Reticulocytes', 'Low', 'down'], ['Marrow', 'Empty and fatty', 'down']] },
            { id: 'ckd', label: 'Kidney failure', note: 'Damaged kidneys make too little EPO, so red cell production slows.', states: { epo: 'down', ery: 'down', rbc: 'down' }, labs: [['Hemoglobin', 'Low', 'down'], ['Reticulocytes', 'Low', 'down'], ['Red cell size (MCV)', 'Normal', '']] },
            { id: 'hemolysis', label: 'Hemolysis (sickle cell disease)', note: 'Red cells are destroyed early. EPO rises and the red cell line works overtime.', states: { epo: 'up', ery: 'up', rbc: 'bad' }, labs: [['Hemoglobin', 'Low', 'down'], ['Reticulocytes', 'High', 'up'], ['LDH and bilirubin', 'High', 'up']] },
            { id: 'parvo', label: 'Parvovirus B19 crisis', note: 'The virus infects red cell precursors and pauses production for about a week. Dangerous when red cells already live short lives.', states: { ery: 'blocked', rbc: 'down' }, labs: [['Hemoglobin', 'Falling fast', 'down'], ['Reticulocytes', 'Near zero', 'down']] },
          ],
        },
      },
      layers: {
        anatomy: {
          cadet: 'Bone marrow is the soft tissue inside your bones. In babies, almost every bone makes blood. As you grow, the job moves to the bones of your skull, spine, ribs, breastbone and hips, and the tops of your thigh and arm bones. The rest of your marrow slowly fills with fat. That’s why doctors who need a marrow sample usually take it from the back of the hip bone.',
          college: 'Red (hematopoietic) marrow fills the medullary cavities and the spaces between trabeculae of spongy bone. At birth it occupies nearly the whole skeleton; during childhood it is replaced by yellow (fatty) marrow in the limbs, distal to proximal. Adults keep active marrow mainly in the axial skeleton and the proximal femur and humerus. The posterior iliac crest is the standard site for aspiration and biopsy: superficial, safe and marrow-rich.',
          medical: 'Adult hematopoietic marrow is concentrated in vertebrae, pelvis, sternum, ribs, skull and proximal femora and humeri; conversion to fatty marrow proceeds appendicular-to-axial and distal-to-proximal. Nutrient arteries feed a sinusoidal network; mature cells transmigrate through sinusoidal endothelium. Under chronic demand (severe hemolysis, thalassemia) yellow marrow reconverts, the diploë widens (“hair-on-end” skull films), facial bones expand, and extramedullary hematopoiesis can occur in liver and spleen.',
        },
        physiology: {
          cadet: 'Every day your marrow makes hundreds of billions of new blood cells. It all starts with stem cells that can become any kind of blood cell: red cells that carry oxygen, white cells that fight germs and platelets that stop bleeding. Your body sends signals to the marrow, like a hormone from your kidneys called EPO, telling it what to make more of.',
          college: 'Hematopoietic stem cells self-renew and differentiate into common myeloid and lymphoid progenitors. Myeloid progenitors give rise to erythrocytes, megakaryocytes (platelets), granulocytes and monocytes; lymphoid progenitors to B cells, T-cell precursors and NK cells. Growth factors steer output: erythropoietin from the kidney (red cells), thrombopoietin from the liver (platelets) and G-CSF (neutrophils).',
          medical: 'Daily output is on the order of 2×10¹¹ erythrocytes and 10¹¹ platelets and neutrophils. Renal peritubular interstitial cells sense hypoxia through HIF and secrete EPO; hepatic TPO is cleared by platelet and megakaryocyte mass, so free TPO rises when platelets fall; G-CSF rises with inflammation. The stromal niche (CXCL12, SCF) retains stem cells. The reticulocyte count indexes erythroid response: anemia with low reticulocytes means underproduction; with high reticulocytes, loss or destruction.',
        },
        histology: {
          cadet: 'Under a microscope, marrow looks like a busy city: crowded with young blood cells at every stage, with round empty spaces where fat cells sit. Giant cells called megakaryocytes break off tiny pieces that become platelets.',
          college: 'A biopsy shows bony trabeculae with hematopoietic cells and fat cells between them. Cellularity is roughly 100 minus age (%): about 80% in a young child and 50% in midlife. Red cell precursors cluster around macrophages in erythroid islands; megakaryocytes sit next to sinusoids. The aspirate smear shows maturation: myeloblast → promyelocyte → myelocyte → metamyelocyte → band → neutrophil.',
          medical: 'Normal myeloid-to-erythroid ratio is about 2–4:1 with blasts under 5%. Hypocellular marrow suggests aplastic anemia or recent chemotherapy; hypercellular marrow suggests leukemia, a myeloproliferative neoplasm or compensatory hyperplasia. Prussian blue stain assesses iron stores (absent in iron deficiency; ring sideroblasts in sideroblastic anemia, including lead poisoning). Twenty percent or more blasts defines acute leukemia; infiltration by tumor or fibrosis produces a leukoerythroblastic smear with teardrop cells.',
        },
        clinical: {
          cadet: 'When the marrow isn’t working, all three cell families can drop. Low red cells make you pale and tired, low platelets cause bruises and nosebleeds, and low white cells lead to fevers and infections. Doctors check a complete blood count and look at the blood under a microscope.',
          college: 'Marrow failure presents as anemia (fatigue, pallor), thrombocytopenia (petechiae, mucosal bleeding) and neutropenia (infections), alone or together. Infiltration adds bone pain, hepatosplenomegaly or lymphadenopathy. Evaluation: CBC with differential, reticulocyte count and smear, then marrow aspirate and biopsy.',
          medical: 'Pancytopenia: production causes (aplastic anemia, MDS, infiltration, B12/folate deficiency, drugs, infection) versus peripheral causes (hypersplenism, immune destruction). A low reticulocyte index, leukoerythroblastosis or circulating blasts steer the workup. Emergencies: hyperleukocytosis, tumor lysis syndrome and febrile neutropenia (ANC < 500 with fever: empiric broad-spectrum antibiotics within one hour).',
        },
      },
      pathology: [
        { name: 'Acute lymphoblastic leukemia', plain: 'A young lymphoid cell copies itself out of control.', chain: ['A genetic change in a lymphoid progenitor', 'Blasts multiply and crowd out normal blood-making', 'Sheets of blasts; few normal precursors', 'Pallor, bruising, fevers, bone pain'], smear: 'leukemia', cases: ['CASE-025', 'CASE-011'] },
        { name: 'Aplastic anemia', plain: 'The stem cells themselves fail.', chain: ['Immune attack on stem cells, or a drug, toxin or virus', 'All cell families fall together', 'Empty, fatty marrow', 'Fatigue, infections and bleeding'], cases: [] },
        { name: 'Marrow stress from hemolysis', plain: 'When red cells die early, the marrow works overtime.', chain: ['Red cells destroyed early (sickle cell disease, spherocytosis)', 'EPO rises and the red cell line expands', 'Erythroid hyperplasia; high reticulocytes; nucleated red cells', 'Anemia, jaundice, bone pain, an enlarged spleen'], smear: 'sickle', cases: ['CASE-042', 'CASE-018'] },
        { name: 'Parvovirus B19 aplastic crisis', plain: 'A common virus pauses red cell production.', chain: ['Parvovirus infects red cell precursors', 'Red cell production stops for about a week', 'Few red cell precursors; giant pronormoblasts', 'Sudden severe anemia, especially in sickle cell disease'], cases: [] },
      ],
      signs: ['Pallor and fatigue', 'Petechiae and easy bruising', 'Recurrent fevers or infections', 'Bone pain, enlarged liver, spleen or lymph nodes'],
      labs: [['Complete blood count', 'Counts each cell family'], ['Reticulocyte count', 'Is the marrow answering anemia?'], ['Peripheral smear', 'Blasts, abnormal shapes, teardrop cells'], ['Marrow aspirate and biopsy', 'Cellularity, blasts, iron, fibrosis']],
      connections: ['red-blood-cells', 'white-blood-cells', 'platelets'],
      quiz: [
        { q: 'In an adult, which site is best for a bone marrow biopsy?', options: ['Middle of the shinbone', 'Back of the hip bone (posterior iliac crest)', 'Bones of the hand', 'Kneecap'], answer: 1, why: 'Adults keep red marrow in the axial skeleton; the posterior iliac crest is safe and marrow-rich.' },
        { q: 'A patient has anemia and a very low reticulocyte count. What does that point to?', options: ['Red cells are being destroyed', 'Bleeding', 'The marrow isn’t producing enough', 'Normal recovery'], answer: 2, why: 'Low reticulocytes with anemia means underproduction; destruction or loss raises reticulocytes.' },
        { q: 'Which hormone tells the marrow to make more red cells?', options: ['Insulin', 'Erythropoietin from the kidney', 'Thyroid hormone', 'Thrombopoietin from the liver'], answer: 1, why: 'The kidney senses low oxygen and releases erythropoietin.' },
      ],
    },
    {
      slug: 'red-blood-cells',
      title: 'Red Blood Cells & Hemoglobin',
      kicker: 'The oxygen carriers',
      summary: 'How a cell with no nucleus carries oxygen to every corner of the body, and what happens when it can’t.',
      parts: ['heart', 'aorta', 'kidneys'],
      smear: { presets: ['normal', 'sickle', 'iron', 'sphero'] },
      widget: { type: 'o2', intro: 'Move the sliders. Watch how hemoglobin grabs oxygen in the lungs and lets go in the tissues.' },
      layers: {
        anatomy: {
          cadet: 'A red blood cell is shaped like a donut without a hole: a flexible disc, thinner in the middle. It has no nucleus, which leaves room for hemoglobin, the protein that carries oxygen. Red cells are so bendy they can squeeze through capillaries narrower than they are. Your heart pumps them around your body about once a minute.',
          college: 'Erythrocytes are anucleate biconcave discs about 7–8 µm across. The shape maximizes surface area for gas exchange and lets the cell deform through 3 µm capillaries and splenic slits. A spectrin–ankyrin cytoskeleton under the membrane provides flexibility. Cells circulate for about 120 days before macrophages in the spleen and liver remove them.',
          medical: 'Deformability depends on surface-to-volume ratio, cytoplasmic viscosity (hemoglobin concentration) and the membrane skeleton (spectrin, ankyrin, band 3, protein 4.2). Defects in vertical membrane interactions cause spherocytosis; horizontal defects cause elliptocytosis. Erythrocytes rely on glycolysis (no mitochondria): the hexose monophosphate shunt makes NADPH to protect against oxidant stress (G6PD), and the Rapoport-Luebering shunt makes 2,3-BPG.',
        },
        physiology: {
          cadet: 'Each red cell holds about 270 million hemoglobin molecules, and each hemoglobin carries four oxygen molecules. In the lungs, hemoglobin grabs oxygen. In hard-working muscles, which are warmer and more acidic, hemoglobin lets go. When there aren’t enough red cells (anemia), your heart beats faster to keep oxygen moving, and you feel tired.',
          college: 'Hemoglobin A is a tetramer (α₂β₂), each chain holding an iron-containing heme. Oxygen binding is cooperative, producing a sigmoid dissociation curve. Acidosis, CO₂, fever and 2,3-BPG shift the curve right (Bohr effect), favoring unloading in tissues; fetal hemoglobin (α₂γ₂) binds 2,3-BPG poorly and shifts it left. Oxygen content depends mostly on hemoglobin concentration: CaO₂ ≈ 1.34 × Hb × SaO₂ + 0.003 × PaO₂.',
          medical: 'Oxygen delivery = cardiac output × CaO₂. In anemia, SaO₂ and PaO₂ stay normal while content falls; compensation includes increased cardiac output, right shift (2,3-BPG) and redistribution. HbS (β6 Glu→Val) polymerizes when deoxygenated; polymerization depends steeply on intracellular HbS concentration and delay time, so dehydration, hypoxia and acidosis promote sickling, while HbF inhibits it. Senescent red cells are cleared extravascularly; heme becomes unconjugated bilirubin and iron is recycled.',
        },
        histology: {
          cadet: 'On a blood smear, healthy red cells look like pink circles with a lighter center. Doctors look at their size, color and shape. Small, pale cells suggest low iron. Crescent-shaped cells are sickle cells. Tiny broken pieces mean the cells are being sliced inside blood vessels.',
          college: 'Normal red cells have central pallor about one-third of the diameter. The CBC indices describe them: MCV (size), MCH and MCHC (hemoglobin content), RDW (variation in size). Young cells (reticulocytes) look slightly blue-gray (polychromasia). Shape changes point to mechanisms: spherocytes (membrane loss), sickle cells (HbS), target cells (excess membrane), schistocytes (mechanical injury).',
          medical: 'Use morphology to localize the problem: microcytosis (iron deficiency, thalassemia, anemia of inflammation, lead, sideroblastic), macrocytosis (B12/folate, liver disease, MDS, reticulocytosis), spherocytes (hereditary spherocytosis, warm autoimmune hemolysis), bite and blister cells (G6PD deficiency), schistocytes (TTP, HUS, DIC, valves), Howell-Jolly bodies (asplenia), basophilic stippling (lead, thalassemia).',
        },
        clinical: {
          cadet: 'Anemia can make people tired, pale, dizzy and short of breath, with a fast heartbeat. If red cells are breaking apart (hemolysis), the skin and eyes may turn yellow and urine may get dark. Doctors find out whether the body isn’t making enough red cells, is losing them, or is destroying them.',
          college: 'Anemia symptoms reflect reduced oxygen delivery and compensation: fatigue, exertional dyspnea, tachycardia, flow murmur, pallor. Hemolysis adds jaundice, dark urine and splenomegaly. Classify by MCV and reticulocyte count, then confirm with targeted tests (ferritin, hemoglobin electrophoresis, LDH, bilirubin, haptoglobin, direct antiglobulin test).',
          medical: 'Hemolysis labs: high LDH and indirect bilirubin, low haptoglobin, reticulocytosis; DAT separates immune from non-immune causes. In sickle cell disease, anticipate vaso-occlusion, acute chest syndrome, stroke, splenic sequestration, priapism and functional asplenia; hydroxyurea raises HbF. Chronic hemolysis brings pigment gallstones and, in some disorders, iron overload from transfusion.',
        },
      },
      pathology: [
        { name: 'Sickle cell disease', plain: 'One letter in the hemoglobin gene changes, and red cells stiffen into crescents.', chain: ['Inherited HbS (β6 glutamic acid → valine)', 'HbS polymerizes when it releases oxygen; cells stiffen and stick', 'Sickle cells, target cells, Howell-Jolly bodies', 'Pain crises, acute chest syndrome, stroke, sequestration, infections'], smear: 'sickle', cases: ['CASE-018', 'CASE-042', 'CASE-043', 'CASE-044'] },
        { name: 'Iron deficiency anemia', plain: 'Without iron, cells can’t finish making hemoglobin.', chain: ['Blood loss (heavy periods, GI bleeding) or poor absorption', 'Heme synthesis stalls; cells keep dividing and end up small', 'Small, pale red cells; pencil cells', 'Fatigue, ice cravings, pallor, fast heart rate'], smear: 'iron', cases: ['CASE-001', 'CASE-030', 'CASE-059'] },
        { name: 'Hereditary spherocytosis and immune hemolysis', plain: 'Red cells lose membrane, become spheres and get trapped.', chain: ['Membrane protein defect, or antibodies coating red cells', 'Cells lose membrane and flexibility', 'Spherocytes; high reticulocytes', 'Jaundice, enlarged spleen, gallstones'], smear: 'sphero', cases: [] },
        { name: 'Thalassemia trait', plain: 'Fewer globin chains: small cells, but plenty of iron.', chain: ['Reduced α- or β-globin production', 'Less hemoglobin per cell', 'Microcytosis with target cells; normal ferritin', 'Usually no symptoms; often mistaken for iron deficiency'], cases: [] },
      ],
      signs: ['Fatigue and exercise intolerance', 'Pallor and fast heart rate', 'Jaundice and dark urine (hemolysis)', 'Enlarged spleen'],
      labs: [['Hemoglobin', 'How much oxygen-carrying protein'], ['MCV', 'Small, normal or large cells'], ['Reticulocytes', 'Production versus destruction'], ['LDH, bilirubin, haptoglobin', 'Signs of hemolysis'], ['Hemoglobin electrophoresis', 'HbS, HbF, HbA2']],
      connections: ['iron', 'spleen', 'bone-marrow'],
      quiz: [
        { q: 'Which change shifts the oxygen curve to the right, helping muscles get more oxygen?', options: ['Cold temperature', 'More acid in the blood', 'Fetal hemoglobin', 'Low 2,3-BPG'], answer: 1, why: 'Acidity, heat, CO₂ and 2,3-BPG lower hemoglobin’s grip on oxygen (Bohr effect).' },
        { q: 'A person with anemia has a normal oxygen saturation of 98%. Why can they still be short of oxygen?', options: ['The pulse oximeter is broken', 'Each red cell carries less', 'There is less hemoglobin, so less total oxygen', 'Their lungs are failing'], answer: 2, why: 'Saturation is a percentage; oxygen content depends on how much hemoglobin there is.' },
        { q: 'Why does fetal hemoglobin protect against sickling?', options: ['It has no iron', 'It doesn’t join HbS polymers', 'It makes cells bigger', 'It speeds up the heart'], answer: 1, why: 'HbF interrupts HbS polymerization; hydroxyurea works partly by raising HbF.' },
      ],
    },
    {
      slug: 'iron',
      title: 'Iron’s Journey',
      kicker: 'Absorb, carry, use, recycle',
      summary: 'Follow one atom of iron from your plate to your hemoglobin and back, and see where the journey breaks.',
      parts: ['liver', 'spleen', 'marrow_axial'],
      smear: { presets: ['normal', 'iron', 'lead'] },
      widget: {
        type: 'pathway',
        intro: 'The body keeps iron in a closed loop and controls it at the gut with a hormone called hepcidin.',
        pathway: {
          title: 'Iron cycle',
          height: 56,
          nodes: [
            { id: 'diet', label: 'Food iron', x: 12, y: 8, w: 18, desc: 'Meat, beans, leafy greens and fortified cereals. Only about 10% is absorbed.' },
            { id: 'hep', label: 'Hepcidin (liver)', x: 50, y: 8, w: 24, desc: 'The master iron hormone. High hepcidin locks the gut and macrophage “doors” (ferroportin).' },
            { id: 'gut', label: 'Duodenum', x: 12, y: 26, w: 18, desc: 'Absorbs about 1–2 mg a day: just enough to replace normal losses.' },
            { id: 'blood', label: 'Transferrin', x: 38, y: 26, w: 18, desc: 'Carries iron through the blood.' },
            { id: 'marrow', label: 'Marrow: heme', x: 62, y: 26, w: 20, desc: 'Puts iron into heme to build hemoglobin.' },
            { id: 'rbc', label: 'Red cells', x: 88, y: 26, w: 18, desc: 'Most of the body’s iron is in hemoglobin.' },
            { id: 'liver', label: 'Liver stores', x: 38, y: 46, w: 20, desc: 'Stores iron as ferritin. Blood ferritin reflects these stores.' },
            { id: 'spleen', label: 'Spleen recycles', x: 66, y: 46, w: 22, desc: 'Macrophages recycle about 20–25 mg of iron daily from old red cells.' },
            { id: 'loss', label: 'Blood loss', x: 90, y: 46, w: 16, desc: 'Each mL of blood lost takes about 0.5 mg of iron with it.' },
          ],
          edges: [['diet', 'gut'], ['gut', 'blood'], ['blood', 'marrow'], ['marrow', 'rbc'], ['rbc', 'spleen'], ['spleen', 'blood'], ['blood', 'liver'], ['rbc', 'loss'], ['hep', 'gut'], ['hep', 'spleen']],
          conditions: [
            { id: 'bleed', label: 'Chronic blood loss', note: 'Heavy periods or slow GI bleeding drain iron faster than the gut can absorb it. Stores empty first, then hemoglobin falls.', states: { loss: 'up', liver: 'down', blood: 'down', rbc: 'down' }, labs: [['Ferritin', 'Low', 'down'], ['Transferrin saturation', 'Low', 'down'], ['MCV', 'Low', 'down'], ['Hemoglobin', 'Low', 'down']] },
            { id: 'celiac', label: 'Celiac disease', note: 'An immune reaction to gluten flattens the duodenal lining, where iron is absorbed. Oral iron doesn’t get in.', states: { gut: 'blocked', blood: 'down', liver: 'down', rbc: 'down' }, labs: [['Ferritin', 'Low', 'down'], ['tTG-IgA', 'High', 'up'], ['Response to oral iron', 'Poor', 'down']] },
            { id: 'inflam', label: 'Inflammation', note: 'Infection or chronic inflammation raises hepcidin. Iron gets locked in stores and macrophages, so the marrow starves even though stores are full.', states: { hep: 'up', gut: 'down', spleen: 'blocked', blood: 'down', liver: 'up', rbc: 'down' }, labs: [['Ferritin', 'Normal or high', 'up'], ['Transferrin saturation', 'Low', 'down'], ['MCV', 'Normal or low', ''], ['CRP', 'High', 'up']] },
            { id: 'lead', label: 'Lead poisoning', note: 'Lead blocks enzymes that build heme, so iron can’t be used even when it’s available. Iron deficiency increases lead absorption.', states: { marrow: 'blocked', rbc: 'down' }, labs: [['Blood lead', 'High', 'up'], ['MCV', 'Low', 'down'], ['Smear', 'Basophilic stippling', '']] },
            { id: 'hh', label: 'Iron overload (hemochromatosis)', note: 'Too little hepcidin leaves the gut door open. Iron piles up in the liver, heart and pancreas. Repeated transfusions cause the same overload.', states: { hep: 'down', gut: 'up', blood: 'up', liver: 'up' }, labs: [['Ferritin', 'High', 'up'], ['Transferrin saturation', 'High', 'up'], ['Liver enzymes', 'Can rise', 'up']] },
          ],
        },
      },
      layers: {
        anatomy: {
          cadet: 'Iron enters your body through the first part of your small intestine, the duodenum, just past the stomach. It travels in your blood, gets used in your bone marrow, and is stored in your liver. Your spleen recycles iron from old red cells so it can be used again.',
          college: 'Dietary iron is absorbed by enterocytes of the duodenum and proximal jejunum. Iron exits enterocytes and macrophages through ferroportin, binds transferrin in plasma and is delivered to erythroid precursors via transferrin receptors. Hepatocytes and reticuloendothelial macrophages (spleen, liver, marrow) store iron as ferritin and hemosiderin.',
          medical: 'Non-heme Fe³⁺ is reduced by duodenal cytochrome b (DCYTB) and imported by DMT1; heme iron enters by a separate pathway. Export via ferroportin requires hephaestin (enterocyte) or ceruloplasmin (macrophage) to oxidize Fe²⁺. Hepatocyte hepcidin binds ferroportin and triggers its degradation. Duodenal disease (celiac, Crohn’s, gastric bypass) and achlorhydria (PPIs, atrophic gastritis) impair absorption.',
        },
        physiology: {
          cadet: 'Your body is careful with iron. It absorbs only a little each day, about the same amount you lose. Most iron is recycled: when red cells get old, the spleen takes them apart and sends the iron back to the marrow. If you lose blood, you lose iron, and your body can run low.',
          college: 'Total body iron is about 3–4 g, two-thirds in hemoglobin. Daily absorption (1–2 mg) balances losses; menstruation, pregnancy and growth increase needs. Recycling by macrophages supplies 20–25 mg per day. Hepcidin rises with iron loading and inflammation, lowering absorption and release; it falls with iron deficiency and increased erythropoiesis (erythroferrone).',
          medical: 'Iron deficiency progresses in stages: depleted stores (low ferritin) → iron-deficient erythropoiesis (low transferrin saturation, rising zinc protoporphyrin, low reticulocyte hemoglobin) → microcytic anemia. In inflammation, IL-6 raises hepcidin, producing hypoferremia with preserved or raised ferritin. Because ferritin is an acute-phase reactant, a “normal” ferritin doesn’t rule out iron deficiency in an inflamed patient; soluble transferrin receptor helps.',
        },
        histology: {
          cadet: 'When iron is low, red cells come out small and pale because they couldn’t finish filling up with hemoglobin. In lead poisoning, you can see tiny blue dots inside red cells.',
          college: 'Iron deficiency causes microcytic, hypochromic red cells with variable size (high RDW) and pencil cells. A marrow iron stain (Prussian blue) shows absent stores. Lead poisoning causes basophilic stippling and ring sideroblasts.',
          medical: 'Distinguish microcytic anemias: iron deficiency (high RDW, low ferritin, absent marrow iron), thalassemia trait (normal RDW, high RBC count, target cells, normal iron), anemia of inflammation (normal-to-low MCV, high ferritin, iron trapped in macrophages), sideroblastic (ring sideroblasts; lead, alcohol, B6, congenital ALAS2). Mentzer index (MCV/RBC < 13) suggests thalassemia trait.',
        },
        clinical: {
          cadet: 'Low iron can make you tired, short of breath, pale and dizzy, with a fast heartbeat. Some people crave ice. The most important question isn’t just “Is iron low?” but “Why?” In teenage girls, heavy periods are common; in boys and men, healers look for bleeding or poor absorption in the gut.',
          college: 'Iron deficiency is the world’s most common nutritional deficiency. Ask about diet, menstrual blood loss, GI symptoms and bleeding. In children under 2, excess cow’s milk is a classic cause. Treat the cause and replace iron (oral, or IV when absorption is poor or loss is ongoing).',
          medical: 'Iron deficiency in an adult man or postmenopausal woman requires GI evaluation (endoscopy and colonoscopy) for occult bleeding or malignancy. In adolescents, consider IBD and celiac disease in boys and heavy menstrual bleeding with bleeding disorders (VWD) in girls. Oral iron on alternate days improves absorption by avoiding hepcidin surges; expect a reticulocyte response in 7–10 days.',
        },
      },
      pathology: [
        { name: 'Iron deficiency from blood loss', plain: 'More iron leaves than comes in.', chain: ['Heavy periods, GI bleeding (IBD, ulcers, cancer)', 'Stores empty, then heme production stalls', 'Small, pale cells; absent marrow iron', 'Fatigue, pica, pallor, fast heart rate'], smear: 'iron', cases: ['CASE-001', 'CASE-030'] },
        { name: 'Malabsorption (celiac disease)', plain: 'The door for iron is damaged.', chain: ['Immune reaction to gluten', 'Duodenal villi flatten; absorption drops', 'Microcytic cells despite iron pills', 'Belly pain, poor growth, anemia that won’t improve'], smear: 'iron', cases: ['CASE-059'] },
        { name: 'Anemia of inflammation', plain: 'Iron is locked away during illness.', chain: ['Infection, autoimmune disease, kidney disease', 'Hepcidin rises; ferroportin is degraded', 'Normal or small cells; iron trapped in macrophages', 'Mild anemia with high ferritin'], cases: ['CASE-001'] },
        { name: 'Lead poisoning', plain: 'Lead jams the heme assembly line.', chain: ['Old paint, dust or water containing lead', 'Lead inhibits ALA dehydratase and ferrochelatase', 'Basophilic stippling; ring sideroblasts', 'Developmental delay, belly pain, anemia'], smear: 'lead', cases: ['CASE-058'] },
      ],
      signs: ['Fatigue and pallor', 'Pica (craving ice, dirt or other non-foods)', 'Spoon-shaped nails', 'Restless legs'],
      labs: [['Ferritin', 'Iron stores (also rises with inflammation)'], ['Transferrin saturation', 'Iron available for the marrow'], ['MCV and RDW', 'Small cells with variable size'], ['Reticulocyte hemoglobin', 'Early marker of iron-limited production']],
      connections: ['red-blood-cells', 'spleen', 'bone-marrow'],
      quiz: [
        { q: 'A teenage boy who eats a normal diet has iron deficiency. What should healers look for?', options: ['Nothing; give iron', 'Blood loss or poor absorption in the gut', 'Too much exercise', 'Too much sleep'], answer: 1, why: 'Diet alone rarely explains it; consider IBD, celiac disease or GI bleeding.' },
        { q: 'During a serious infection, ferritin is high but transferrin saturation is low. Why?', options: ['Iron overload', 'Hepcidin locks iron in stores', 'Lead poisoning', 'Lab error'], answer: 1, why: 'Inflammation raises hepcidin, trapping iron in macrophages and stores.' },
        { q: 'Which blood test best reflects iron stores in a healthy person?', options: ['Hemoglobin', 'Ferritin', 'Platelet count', 'Bilirubin'], answer: 1, why: 'Ferritin reflects stored iron, though it also rises with inflammation.' },
      ],
    },
    {
      slug: 'platelets',
      title: 'Platelets & Clotting',
      kicker: 'Stopping the leak',
      summary: 'How the body seals a damaged vessel in seconds, and why some people bleed or clot when they shouldn’t.',
      parts: ['liver', 'spleen', 'marrow_axial'],
      smear: { presets: ['normal', 'itp', 'tma'] },
      widget: {
        type: 'pathway',
        intro: 'Hemostasis in steps: plug, then glue, then clean-up. Pick a disorder to see which step fails and the lab pattern it leaves.',
        pathway: {
          title: 'Hemostasis',
          height: 56,
          nodes: [
            { id: 'injury', label: 'Vessel injury', x: 12, y: 8, w: 20, desc: 'Damage exposes collagen and tissue factor beneath the vessel lining.' },
            { id: 'vwf', label: 'VWF grabs collagen', x: 12, y: 26, w: 22, desc: 'Von Willebrand factor tethers platelets to exposed collagen (via GPIb).' },
            { id: 'adhere', label: 'Platelets stick', x: 38, y: 26, w: 20, desc: 'Platelets adhere, change shape and release signals.' },
            { id: 'agg', label: 'Platelets clump', x: 62, y: 26, w: 20, desc: 'Fibrinogen bridges platelets via GPIIb/IIIa: the primary plug.' },
            { id: 'adams', label: 'ADAMTS13 trims VWF', x: 12, y: 46, w: 24, desc: 'This enzyme cuts long VWF strings so platelets don’t clump in healthy vessels.' },
            { id: 'cascade', label: 'Clotting factors', x: 38, y: 46, w: 20, desc: 'Tissue factor starts a cascade of liver-made factors (including VIII and IX).' },
            { id: 'thrombin', label: 'Thrombin', x: 62, y: 46, w: 16, desc: 'Turns fibrinogen into fibrin and powerfully activates platelets.' },
            { id: 'fibrin', label: 'Fibrin mesh', x: 88, y: 26, w: 18, desc: 'Fibrin strands glue the platelet plug into a stable clot.' },
            { id: 'plasmin', label: 'Clot clean-up', x: 88, y: 46, w: 18, desc: 'Plasmin dissolves the clot as the vessel heals.' },
          ],
          edges: [['injury', 'vwf'], ['vwf', 'adhere'], ['adhere', 'agg'], ['agg', 'fibrin'], ['injury', 'cascade'], ['cascade', 'thrombin'], ['thrombin', 'agg'], ['thrombin', 'fibrin'], ['fibrin', 'plasmin'], ['adams', 'vwf']],
          conditions: [
            { id: 'itp', label: 'ITP', note: 'Antibodies destroy platelets. Too few to build plugs: skin and mucosal bleeding. The clotting cascade is normal.', states: { adhere: 'down', agg: 'down' }, labs: [['Platelets', 'Very low', 'down'], ['PT and PTT', 'Normal', ''], ['Smear', 'Large platelets', '']] },
            { id: 'vwd', label: 'Von Willebrand disease', note: 'Too little or faulty VWF: platelets don’t stick well. VWF also protects factor VIII, so it falls too.', states: { vwf: 'down', adhere: 'down' }, labs: [['Platelets', 'Normal', ''], ['VWF antigen and activity', 'Low', 'down'], ['Factor VIII', 'Low', 'down'], ['PTT', 'Normal or long', 'up']] },
            { id: 'hemophilia', label: 'Hemophilia A', note: 'Missing factor VIII stalls the cascade: plugs form, but there’s not enough thrombin to glue them. Deep bleeding into joints and muscles.', states: { cascade: 'down', thrombin: 'down', fibrin: 'down' }, labs: [['Platelets', 'Normal', ''], ['PTT', 'Long', 'up'], ['PT', 'Normal', ''], ['Factor VIII', 'Very low', 'down']] },
            { id: 'ttp', label: 'TTP', note: 'No ADAMTS13: giant VWF strings grab platelets everywhere. Tiny clots block small vessels and slice red cells; platelets get used up.', states: { adams: 'blocked', vwf: 'up', adhere: 'up', agg: 'bad' }, labs: [['Platelets', 'Very low', 'down'], ['Schistocytes', 'Present', 'up'], ['LDH', 'High', 'up'], ['PT and PTT', 'Normal', ''], ['ADAMTS13', 'Under 10%', 'down']] },
            { id: 'dic', label: 'DIC', note: 'Severe sepsis or trauma switches clotting on everywhere. Factors and platelets are consumed, so the patient clots and bleeds at once.', states: { cascade: 'up', thrombin: 'up', fibrin: 'bad', plasmin: 'up', agg: 'down' }, labs: [['Platelets', 'Low', 'down'], ['PT and PTT', 'Long', 'up'], ['Fibrinogen', 'Low', 'down'], ['D-dimer', 'High', 'up']] },
          ],
        },
      },
      layers: {
        anatomy: {
          cadet: 'Platelets are tiny pieces broken off giant cells in your bone marrow. About a third of them wait in your spleen. Your liver makes most of the clotting proteins that work with platelets to seal leaks.',
          college: 'Platelets (2–3 µm, anucleate) are shed from megakaryocytes in marrow sinusoids. About one-third are pooled in the spleen; splenomegaly increases pooling and lowers the count. The liver synthesizes most coagulation factors (vitamin K dependent: II, VII, IX, X, proteins C and S) and thrombopoietin; endothelial cells make von Willebrand factor and factor VIII is carried by VWF.',
          medical: 'Endothelium is anticoagulant at rest (prostacyclin, nitric oxide, thrombomodulin, heparan sulfate, tPA) and procoagulant when injured (exposed collagen and tissue factor, Weibel-Palade body release of VWF). Hepatic synthetic failure prolongs PT first (factor VII has the shortest half-life). Hypersplenism sequesters platelets; thrombocytosis follows splenectomy.',
        },
        physiology: {
          cadet: 'When you get a cut, three things happen fast. The blood vessel squeezes. Platelets rush in and stick together to form a plug. Then clotting proteins build a net of fibrin that glues the plug in place. Later, the body dissolves the clot once the vessel heals.',
          college: 'Primary hemostasis: vasoconstriction; VWF-mediated adhesion (GPIb); activation (ADP, thromboxane A₂); aggregation via fibrinogen bridging GPIIb/IIIa. Secondary hemostasis: tissue factor–factor VIIa initiates thrombin generation, amplified on activated platelets by factors VIII and IX; thrombin converts fibrinogen to fibrin, cross-linked by factor XIII. Regulation: antithrombin, proteins C and S, tissue factor pathway inhibitor and fibrinolysis (plasmin).',
          medical: 'The cell-based model replaces the textbook cascade: initiation (TF-VIIa on TF-bearing cells), amplification (thrombin activates platelets, V, VIII, XI) and propagation (tenase and prothrombinase on the platelet surface). PT measures extrinsic/common pathways (VII, X, V, II, fibrinogen); PTT measures intrinsic/common (XII, XI, IX, VIII). ADAMTS13 cleaves ultra-large VWF multimers under shear. Thrombosis follows Virchow’s triad: stasis, hypercoagulability, endothelial injury.',
        },
        histology: {
          cadet: 'On a blood smear, platelets look like tiny purple dots between red cells. When platelets are being destroyed fast, the ones you see are bigger, because they’re brand new. In TTP and HUS, you see broken red cell fragments.',
          college: 'Normal platelets are small, granular and number 150,000–450,000/µL (about 10–20 per high-power field). Large platelets suggest increased turnover (ITP) or inherited macrothrombocytopenia. Schistocytes plus thrombocytopenia indicate a thrombotic microangiopathy. Always rule out pseudothrombocytopenia (platelet clumping in EDTA tubes).',
          medical: 'Thrombotic microangiopathies show platelet-rich hyaline microthrombi in arterioles and capillaries (TTP: brain, heart, kidney; HUS: glomeruli). DIC shows fibrin thrombi with consumption. Marrow in ITP shows normal or increased megakaryocytes, distinguishing peripheral destruction from production failure.',
        },
        clinical: {
          cadet: 'Platelet problems cause small red dots on the skin, easy bruising, nosebleeds and bleeding gums. Clotting-factor problems, like hemophilia, cause deep bleeding into joints and muscles. Sometimes blood clots when it shouldn’t, blocking vessels in the legs, lungs or brain.',
          college: 'Bleeding pattern localizes the defect: mucocutaneous bleeding (petechiae, epistaxis, menorrhagia) suggests platelets or VWF; deep tissue and delayed bleeding (hemarthrosis, hematomas) suggests factor deficiency. Screen with platelet count, PT/INR, PTT and fibrinogen, then targeted tests (VWF panel, factor levels, smear for schistocytes).',
          medical: 'Thrombocytopenia with schistocytes is a medical emergency (TTP: plasma exchange; avoid platelet transfusion). ITP is a diagnosis of exclusion; treat bleeding, not the number. DIC: treat the cause, replace selectively (platelets, cryoprecipitate, plasma) when bleeding. Estrogen, immobility, cancer, inherited thrombophilia and antiphospholipid antibodies raise venous thrombosis risk.',
        },
      },
      pathology: [
        { name: 'Immune thrombocytopenia (ITP)', plain: 'The immune system destroys platelets.', chain: ['Antibodies against platelet surface proteins, often after a virus', 'Platelets cleared quickly by the spleen', 'Few, large platelets; normal red and white cells', 'Petechiae, bruising, nosebleeds'], smear: 'itp', cases: ['CASE-014'] },
        { name: 'Thrombotic thrombocytopenic purpura (TTP)', plain: 'Giant clotting strings grab platelets everywhere.', chain: ['Antibody against ADAMTS13', 'Ultra-large VWF builds platelet clots in small vessels', 'Schistocytes; microthrombi in organs', 'Confusion, low platelets, dark urine, organ injury'], smear: 'tma', cases: ['CASE-013'] },
        { name: 'Hemolytic uremic syndrome (HUS)', plain: 'A bacterial toxin injures tiny kidney vessels.', chain: ['Shiga toxin–producing E. coli', 'Endothelial injury and microthrombi, mostly in kidneys', 'Schistocytes; glomerular thrombi', 'Bloody diarrhea, then anemia, low platelets and kidney failure'], smear: 'tma', cases: ['CASE-012'] },
        { name: 'Von Willebrand disease', plain: 'The platelet “glue” is low.', chain: ['Inherited low or faulty VWF', 'Platelets adhere poorly; factor VIII falls', 'Normal-looking platelets', 'Nosebleeds, heavy periods, bleeding after procedures'], cases: ['CASE-030'] },
        { name: 'Disseminated intravascular coagulation (DIC)', plain: 'Clotting turns on everywhere and uses itself up.', chain: ['Sepsis, trauma, cancer, obstetric emergencies', 'Widespread thrombin generation consumes factors and platelets', 'Schistocytes; fibrin microthrombi', 'Bleeding from IV sites, purpura, organ failure'], smear: 'tma', cases: ['CASE-008'] },
        { name: 'Venous thrombosis and pulmonary embolism', plain: 'A clot forms where it shouldn’t, then travels.', chain: ['Stasis, hypercoagulability (estrogen, inherited), vessel injury', 'Thrombin generation outpaces natural anticoagulants', 'Fibrin-rich red clot in a deep vein', 'Leg swelling; sudden chest pain and shortness of breath'], cases: ['CASE-061'] },
      ],
      signs: ['Petechiae and purpura', 'Nosebleeds and gum bleeding', 'Heavy menstrual bleeding', 'Joint or muscle bleeding (factor disorders)', 'Leg swelling or sudden breathlessness (clots)'],
      labs: [['Platelet count', 'How many'], ['PT/INR and PTT', 'Which clotting pathway is slow'], ['Fibrinogen and D-dimer', 'Consumption and breakdown'], ['VWF panel and factor levels', 'Specific deficiencies'], ['Smear', 'Schistocytes, platelet size, clumping']],
      connections: ['bone-marrow', 'spleen', 'red-blood-cells'],
      quiz: [
        { q: 'A child has petechiae and nosebleeds. Platelets are 4,000; PT and PTT are normal. Which step is failing?', options: ['Clotting factors', 'The platelet plug', 'Clot breakdown', 'Vessel constriction'], answer: 1, why: 'Too few platelets to build plugs; the cascade (PT/PTT) is normal, as in ITP.' },
        { q: 'Why should platelets generally not be given in TTP?', options: ['They’re too expensive', 'They may fuel more microthrombi', 'They cause fever', 'They don’t exist'], answer: 1, why: 'Ultra-large VWF will grab transfused platelets and form more clots.' },
        { q: 'Which lab is prolonged in hemophilia A?', options: ['PT only', 'PTT', 'Platelet count', 'Bleeding time only'], answer: 1, why: 'Factor VIII is in the intrinsic pathway, measured by the PTT.' },
      ],
    },
    {
      slug: 'white-blood-cells',
      title: 'White Blood Cells',
      kicker: 'The defenders',
      summary: 'Meet the immune cells in your blood and learn to read what their numbers are saying.',
      parts: ['spleen', 'marrow_axial'],
      smear: { presets: ['normal', 'leukemia'] },
      widget: {
        type: 'pathway',
        intro: 'White cells move from the marrow, through the blood, into tissues. Pick a scenario to see how the counts change.',
        pathway: {
          title: 'White cell traffic',
          height: 56,
          nodes: [
            { id: 'marrow', label: 'Marrow reserve', x: 12, y: 28, w: 20, desc: 'The marrow holds a reserve of mature and young neutrophils ready to release.' },
            { id: 'margin', label: 'Cells on vessel walls', x: 38, y: 8, w: 26, desc: 'About half of neutrophils roll along vessel walls (the marginated pool), not counted in the CBC.' },
            { id: 'blood', label: 'Blood (CBC)', x: 38, y: 28, w: 18, desc: 'The white count measures cells free in the blood.' },
            { id: 'tissue', label: 'Infection site', x: 62, y: 28, w: 20, desc: 'Signals from injured tissue call white cells out of the blood.' },
            { id: 'neut', label: 'Neutrophils', x: 88, y: 12, w: 18, desc: 'Eat and kill bacteria and fungi.' },
            { id: 'lymph', label: 'Lymphocytes', x: 88, y: 28, w: 18, desc: 'B cells make antibodies; T cells kill infected cells and coordinate.' },
            { id: 'eos', label: 'Eosinophils', x: 88, y: 44, w: 18, desc: 'Fight parasites and drive allergic inflammation.' },
          ],
          edges: [['marrow', 'blood'], ['margin', 'blood'], ['blood', 'tissue'], ['tissue', 'neut'], ['tissue', 'lymph'], ['tissue', 'eos']],
          conditions: [
            { id: 'bact', label: 'Bacterial infection', note: 'The marrow releases neutrophils, including young “band” forms (a left shift).', states: { marrow: 'up', blood: 'up', neut: 'up' }, labs: [['White count', 'High', 'up'], ['Neutrophils', 'High, with bands', 'up'], ['CRP', 'High', 'up']] },
            { id: 'viral', label: 'Viral infection', note: 'Lymphocytes respond. In mono (EBV), large reactive lymphocytes appear.', states: { lymph: 'up' }, labs: [['Lymphocytes', 'High or reactive', 'up'], ['Neutrophils', 'Normal or low', '']] },
            { id: 'steroid', label: 'Steroids or stress', note: 'Neutrophils peel off vessel walls into the blood (demargination). The count rises without infection and without bands.', states: { margin: 'down', blood: 'up' }, labs: [['Neutrophils', 'High, no bands', 'up'], ['Lymphocytes and eosinophils', 'Low', 'down']] },
            { id: 'chemo', label: 'Chemotherapy or leukemia', note: 'The marrow can’t make enough neutrophils. Infections can become life-threatening quickly.', states: { marrow: 'down', blood: 'down', neut: 'down' }, labs: [['Absolute neutrophil count', 'Under 500', 'down'], ['Fever', 'An emergency', 'up']] },
            { id: 'allergy', label: 'Allergy, asthma or parasites', note: 'Eosinophils rise.', states: { eos: 'up' }, labs: [['Eosinophils', 'High', 'up']] },
          ],
        },
      },
      layers: {
        anatomy: {
          cadet: 'White blood cells are made in the bone marrow. Some live mostly in the blood, and many travel to lymph nodes, the spleen and tissues where germs try to get in. Your spleen is like a giant lymph node for your blood.',
          college: 'Leukocytes arise in marrow; lymphocytes also mature and reside in the thymus (T cells), lymph nodes, spleen, tonsils and mucosa-associated lymphoid tissue. Granulocytes leave the blood through post-capillary venules into tissues (rolling, adhesion, transmigration). The spleen filters blood-borne antigens; lymph nodes filter lymph.',
          medical: 'Leukocyte extravasation: selectin-mediated rolling, integrin activation (LFA-1/ICAM-1) for firm adhesion, then diapedesis guided by chemokines. Leukocyte adhesion deficiency causes neutrophilia with recurrent bacterial infections and absent pus. Splenic marginal-zone B cells generate T-independent IgM responses to polysaccharide capsules, explaining susceptibility to encapsulated organisms in asplenia.',
        },
        physiology: {
          cadet: 'Different white cells have different jobs. Neutrophils eat bacteria. Lymphocytes remember germs and make antibodies. Monocytes become cleanup cells called macrophages. Eosinophils fight parasites and are involved in allergies. Doctors can tell what kind of infection you might have by which white cells go up.',
          college: 'Normal adult differential: neutrophils 40–70%, lymphocytes 20–40%, monocytes 2–8%, eosinophils 1–4%, basophils under 1%. Bacterial infection raises neutrophils with bands; viral infection often raises lymphocytes; allergy and parasites raise eosinophils. Glucocorticoids raise neutrophils (demargination) and lower lymphocytes and eosinophils.',
          medical: 'Absolute counts matter more than percentages: ANC = WBC × (% neutrophils + % bands). Neutropenia: mild 1,000–1,500, moderate 500–1,000, severe under 500; infection risk rises steeply below 500. Benign ethnic neutropenia (Duffy-null phenotype) causes lower counts without increased infection risk. Leukemoid reactions (WBC > 50,000) are reactive, versus clonal leukemias; smear, LAP-era concepts and flow cytometry distinguish them.',
        },
        histology: {
          cadet: 'On a smear, white cells are the ones with purple nuclei. Neutrophils have a nucleus split into lobes. Lymphocytes are small with a round nucleus that fills most of the cell. Blasts are big immature cells that shouldn’t be in the blood.',
          college: 'Neutrophils: 3–5 lobed nucleus, pale granules. Bands: horseshoe nucleus. Lymphocytes: round dark nucleus, thin blue cytoplasm. Monocytes: largest, folded nucleus, gray-blue cytoplasm. Eosinophils: bilobed nucleus with orange-red granules. Blasts: large, high nuclear-to-cytoplasmic ratio, fine chromatin and nucleoli.',
          medical: 'Toxic granulation, Döhle bodies and vacuolization suggest sepsis. Hypersegmented neutrophils (≥ 6 lobes) suggest B12/folate deficiency. Auer rods indicate a myeloid blast (AML, especially APL). Smudge cells are typical of CLL. Reactive lymphocytes in EBV are large with abundant cytoplasm scalloping around red cells.',
        },
        clinical: {
          cadet: 'A high white count usually means the body is fighting something. A very low count means the body can’t fight infections well, so even a small fever can be dangerous. Cancers of white cells, called leukemias, can make the count very high or very low.',
          college: 'Leukocytosis: infection, inflammation, stress, steroids, smoking or leukemia. Neutropenia: chemotherapy, viral suppression, autoimmune, nutritional deficiency or marrow failure. Fever with ANC under 500 is an emergency requiring prompt antibiotics.',
          medical: 'Interpret the CBC in context: leukocytosis with left shift and toxic changes suggests bacterial sepsis; lymphocytosis with reactive lymphocytes suggests EBV/CMV; eosinophilia: allergies, asthma, drugs (DRESS), parasites, adrenal insufficiency, malignancy. Circulating blasts warrant same-day hematology evaluation and assessment for tumor lysis and leukostasis.',
        },
      },
      pathology: [
        { name: 'Bacterial sepsis', plain: 'The marrow floods the blood with neutrophils.', chain: ['Bacteria invade the bloodstream', 'Cytokines release marrow reserves', 'Neutrophilia with bands, toxic granulation', 'Fever, fast heart rate, low blood pressure'], cases: ['CASE-008', 'CASE-057'] },
        { name: 'Acute leukemia', plain: 'Immature white cells take over.', chain: ['Clonal genetic change in a precursor', 'Blasts proliferate; normal cells crowded out', 'Blasts in blood and marrow', 'Infections, bleeding, anemia, bone pain'], smear: 'leukemia', cases: ['CASE-025'] },
        { name: 'Febrile neutropenia', plain: 'Too few defenders, and a fever.', chain: ['Chemotherapy or marrow failure', 'Neutrophils fall below 500', 'Few neutrophils on smear', 'Fever may be the only sign of serious infection'], cases: ['CASE-011'] },
        { name: 'Allergic inflammation', plain: 'Eosinophils and mast cells overreact.', chain: ['Allergen exposure in a sensitized person', 'IgE-triggered mast cell release; eosinophils recruited', 'Eosinophilia', 'Wheezing, hives, swelling'], cases: ['CASE-009', 'CASE-017'] },
      ],
      signs: ['Fever and recurrent infections', 'Swollen lymph nodes', 'Enlarged spleen', 'Mouth sores (neutropenia)'],
      labs: [['White count with differential', 'Which cell types'], ['Absolute neutrophil count', 'Infection risk'], ['Smear', 'Bands, blasts, reactive cells'], ['Flow cytometry', 'Identifies clonal populations']],
      connections: ['bone-marrow', 'spleen'],
      quiz: [
        { q: 'Which white cell rises most in a typical bacterial infection?', options: ['Eosinophils', 'Neutrophils', 'Basophils', 'Lymphocytes'], answer: 1, why: 'Neutrophils (with bands) lead the response to bacteria.' },
        { q: 'A patient on steroids has a high neutrophil count but no bands and feels well. Why?', options: ['Hidden infection', 'Demargination', 'Leukemia', 'Lab error'], answer: 1, why: 'Steroids release neutrophils from vessel walls into the counted pool.' },
        { q: 'Why is fever with an ANC under 500 an emergency?', options: ['It causes dehydration', 'The body can’t contain bacteria', 'It lowers platelets', 'It isn’t an emergency'], answer: 1, why: 'Without neutrophils, infections spread fast; antibiotics are started within an hour.' },
      ],
    },
    {
      slug: 'spleen',
      title: 'The Spleen',
      kicker: 'The blood filter',
      summary: 'A fist-sized organ that quality-checks every red cell and guards against some of the most dangerous bacteria.',
      parts: ['spleen'],
      smear: { presets: ['normal', 'asplenia', 'sphero'] },
      widget: {
        type: 'pathway',
        intro: 'Blood takes two routes through the spleen: an immune check and a squeeze test.',
        pathway: {
          title: 'Splenic circulation',
          height: 56,
          nodes: [
            { id: 'artery', label: 'Splenic artery', x: 12, y: 28, w: 20, desc: 'Blood arrives from the celiac trunk.' },
            { id: 'white', label: 'White pulp', x: 38, y: 10, w: 18, desc: 'Lymphoid tissue samples blood for invaders.' },
            { id: 'antib', label: 'Antibodies vs capsules', x: 66, y: 10, w: 28, desc: 'Marginal-zone B cells make antibodies against encapsulated bacteria like pneumococcus and meningococcus.' },
            { id: 'red', label: 'Red pulp', x: 38, y: 30, w: 18, desc: 'Blood percolates through cords before re-entering the circulation.' },
            { id: 'slit', label: 'Squeeze through slits', x: 66, y: 30, w: 26, desc: 'Red cells must deform through 1–2 µm slits to enter the venous sinuses.' },
            { id: 'macro', label: 'Macrophages remove cells', x: 52, y: 48, w: 28, desc: 'Stiff, old or coated cells that fail the squeeze are eaten; inclusions are pitted out.' },
            { id: 'vein', label: 'Splenic vein', x: 90, y: 30, w: 16, desc: 'Blood leaves to the portal vein and liver.' },
            { id: 'iron', label: 'Iron recycled', x: 86, y: 48, w: 18, desc: 'Iron from removed cells returns to the marrow.' },
          ],
          edges: [['artery', 'white'], ['artery', 'red'], ['white', 'antib'], ['red', 'slit'], ['slit', 'vein'], ['slit', 'macro'], ['macro', 'iron']],
          conditions: [
            { id: 'asplenia', label: 'Sickle cell: spleen damaged', note: 'Repeated sickling scars the spleen by early childhood. It stops filtering and stops making capsule antibodies, so encapsulated bacteria can cause overwhelming sepsis.', states: { white: 'bad', antib: 'down', macro: 'down' }, labs: [['Smear', 'Howell-Jolly bodies', 'up'], ['Risk', 'Severe infection with fever', 'up'], ['Prevention', 'Penicillin and vaccines', '']] },
            { id: 'seq', label: 'Splenic sequestration', note: 'In young children with sickle cell disease, sickled cells block the exit. Blood pools inside, the spleen balloons and hemoglobin drops fast.', states: { slit: 'blocked', red: 'up', vein: 'down' }, labs: [['Hemoglobin', 'Falls ≥ 2 g/dL', 'down'], ['Reticulocytes', 'High', 'up'], ['Platelets', 'Often low', 'down']] },
            { id: 'hs', label: 'Hereditary spherocytosis', note: 'Spheres can’t squeeze through the slits, so macrophages remove them early. Removing the spleen reduces hemolysis.', states: { slit: 'blocked', macro: 'up', iron: 'up' }, labs: [['Smear', 'Spherocytes', 'up'], ['Bilirubin', 'High', 'up'], ['Spleen', 'Enlarged', 'up']] },
            { id: 'hyper', label: 'Enlarged spleen (hypersplenism)', note: 'A big spleen (from liver disease, infection or blood cancers) traps and destroys more cells, lowering counts.', states: { red: 'up', macro: 'up' }, labs: [['Platelets', 'Low', 'down'], ['White cells', 'Low', 'down'], ['Hemoglobin', 'Mildly low', 'down']] },
          ],
        },
      },
      layers: {
        anatomy: {
          cadet: 'Your spleen sits in the upper left side of your belly, tucked behind your lower ribs, about the size of your fist. The ribs protect it. When it gets big from illness, doctors can feel it below the ribs. That’s also why people with an enlarged spleen avoid contact sports: a hit could tear it.',
          college: 'The spleen lies in the left upper quadrant deep to ribs 9–11, against the diaphragm, stomach, left kidney and splenic flexure. It is supplied by the splenic artery (from the celiac trunk) and drained by the splenic vein to the portal vein. Normally it isn’t palpable in adults; an enlarged spleen extends toward the right lower quadrant.',
          medical: 'Splenic segmental arteries are end arteries, predisposing to wedge-shaped infarcts (sickle cell disease, endocarditis). Portal hypertension causes congestive splenomegaly. Referred pain from splenic rupture or subcapsular hematoma to the left shoulder (Kehr sign) reflects diaphragmatic irritation via C3–5. Accessory spleens occur in about 10% of people and can cause recurrence of ITP after splenectomy.',
        },
        physiology: {
          cadet: 'The spleen does two big jobs. It checks red blood cells: healthy, bendy cells squeeze through tiny gaps, while old or stiff cells get caught and recycled. And it helps fight certain germs that wear a slippery coating, by making antibodies against them.',
          college: 'Red pulp filters senescent, rigid or antibody-coated erythrocytes, removes intracellular inclusions (pitting) and recycles iron. White pulp (periarteriolar lymphoid sheaths of T cells and B-cell follicles with a marginal zone) mounts immune responses to blood-borne antigens, especially polysaccharide-encapsulated bacteria. The spleen also pools about a third of platelets.',
          medical: 'Open circulation through the cords of Billroth exposes red cells to macrophages; to re-enter sinuses they must traverse interendothelial slits, a stringent deformability test. Opsonized cells (IgG) are removed by Fc-receptor macrophages (warm autoimmune hemolysis, ITP). Asplenia or hyposplenism impairs clearance of S. pneumoniae, H. influenzae type b and N. meningitidis and malaria parasites, causing overwhelming post-splenectomy infection.',
        },
        histology: {
          cadet: 'Under a microscope, the spleen has two parts. Red pulp is full of blood. White pulp is made of clusters of immune cells, like small lymph nodes around tiny arteries.',
          college: 'Red pulp: splenic cords and venous sinusoids lined by elongated endothelial cells with gaps. White pulp: periarteriolar lymphoid sheath (T cells) surrounding central arterioles, plus B-cell follicles with germinal centers. The marginal zone between them contains specialized B cells and macrophages.',
          medical: 'Sickle cell disease causes congestion, infarcts, fibrosis and siderotic Gamna-Gandy bodies, ending in autosplenectomy. Hereditary spherocytosis shows congested cords with relatively empty sinuses. Signs of hyposplenism on smear: Howell-Jolly bodies, target cells, acanthocytes and pitted red cells.',
        },
        clinical: {
          cadet: 'People with sickle cell disease often have a spleen that doesn’t work by early childhood. That’s why a fever in someone with sickle cell disease is an emergency, and why children take penicillin and get extra vaccines. In young children, the spleen can also suddenly trap blood, an emergency called splenic sequestration.',
          college: 'Splenomegaly causes left upper quadrant fullness, early satiety and cytopenias; it raises rupture risk (avoid contact sports, e.g., with mono). Asplenic patients need vaccination against pneumococcus, meningococcus and Hib, education about fever and, for some, antibiotic prophylaxis.',
          medical: 'In SCD, give penicillin prophylaxis from infancy to at least age 5 and treat fever ≥ 38.5 °C emergently with a blood culture and parenteral ceftriaxone. Teach caregivers splenic palpation; acute splenic sequestration requires careful small-volume transfusion. Splenectomy can treat refractory ITP or hereditary spherocytosis, ideally after age 5–6 and after vaccination.',
        },
      },
      pathology: [
        { name: 'Functional asplenia in sickle cell disease', plain: 'The spleen scars and stops protecting against certain bacteria.', chain: ['Repeated sickling and infarcts in the spleen', 'Loss of filtering and capsule antibodies', 'Howell-Jolly bodies, target cells; small fibrotic spleen', 'Fever can mean life-threatening sepsis'], smear: 'asplenia', cases: ['CASE-008', 'CASE-018'] },
        { name: 'Acute splenic sequestration', plain: 'The spleen traps blood and swells suddenly.', chain: ['Sickled cells obstruct outflow in a young child', 'Blood pools in the spleen', 'Congested red pulp', 'Pallor, big spleen, shock'], smear: 'sickle', cases: ['CASE-042'] },
        { name: 'Hereditary spherocytosis', plain: 'Round, stiff cells fail the squeeze test.', chain: ['Inherited membrane protein defect', 'Cells lose membrane and become spheres', 'Spherocytes; congested cords', 'Anemia, jaundice, splenomegaly, gallstones'], smear: 'sphero', cases: [] },
        { name: 'Splenomegaly and hypersplenism', plain: 'A big spleen holds and destroys more cells.', chain: ['Infection (mono), liver disease, leukemia', 'Pooling and destruction increase', 'Expanded red or white pulp', 'Low counts; left upper belly fullness'], cases: ['CASE-025'] },
      ],
      signs: ['Left upper belly fullness or pain', 'Early fullness when eating', 'Palpable spleen below the ribs', 'Severe infection with fever (asplenia)'],
      labs: [['CBC', 'Cytopenias from pooling'], ['Smear', 'Howell-Jolly bodies, spherocytes'], ['Abdominal ultrasound', 'Spleen size'], ['Blood culture (fever in asplenia)', 'Detect bacteremia']],
      connections: ['red-blood-cells', 'white-blood-cells', 'iron'],
      quiz: [
        { q: 'Why is fever an emergency in a child with sickle cell disease?', options: ['Fever causes sickling only', 'The spleen often doesn’t work, so bacteria can spread fast', 'It causes stroke directly', 'It isn’t an emergency'], answer: 1, why: 'Functional asplenia raises the risk of sepsis from encapsulated bacteria.' },
        { q: 'What do Howell-Jolly bodies on a smear suggest?', options: ['Iron deficiency', 'A missing or nonfunctioning spleen', 'Lead poisoning', 'Leukemia'], answer: 1, why: 'The spleen normally pits these nuclear remnants out of red cells.' },
        { q: 'A teen with mono has an enlarged spleen. What advice matters most?', options: ['Drink more milk', 'Avoid contact sports until it shrinks', 'Start iron', 'Nothing'], answer: 1, why: 'An enlarged spleen can rupture with a hit.' },
      ],
    },
  ],
};

export const READING = [
  { title: 'OpenStax Anatomy & Physiology 2e, chapter 18: The Cardiovascular System: Blood', note: 'Free, openly licensed textbook (CC BY 4.0).', url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/18-introduction' },
  { title: 'ASH Image Bank', note: 'Real blood and marrow micrographs from the American Society of Hematology.', url: 'https://imagebank.hematology.org/' },
  { title: 'HSLS anatomy e-books (University of Pittsburgh)', note: 'Netter, Gray’s, Sobotta and more. Requires Pitt or UPMC sign-in.', url: 'https://www.hsls.pitt.edu/e-books/subject/Anatomy' },
];

export const ATLAS_SYSTEMS = [
  { slug: 'blood', name: 'Blood & Bone Marrow', ready: true },
  { slug: 'heart', name: 'Heart & Circulation' },
  { slug: 'lungs', name: 'Lungs & Breathing' },
  { slug: 'kidney', name: 'Kidneys & Urinary Tract' },
  { slug: 'gut', name: 'Digestive System' },
  { slug: 'brain', name: 'Brain & Nerves' },
  { slug: 'endocrine', name: 'Hormones & Metabolism' },
  { slug: 'immune', name: 'Immune System' },
  { slug: 'musculoskeletal', name: 'Bones, Joints & Muscles' },
  { slug: 'reproductive', name: 'Reproductive System' },
  { slug: 'skin', name: 'Skin' },
];

export const topicBySlug = (slug) => BLOOD.topics.find((t) => t.slug === slug);
