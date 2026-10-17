// Authored mission content (data, not live AI). Every fact maps to a row in docs/history-sources.md.
export const OFFICER_NAME = 'Veteran officer (composite character)';

// Dialogue nodes. `options` are choices; a node with `next` and no options continues on E/Space; `end: true` finishes.
export const DIALOGUE = {
  start: {
    text: 'Hannibal. The army has not slept since Hasdrubal fell. The men are asking who will lead them now.',
    options: [
      { label: 'How did Hasdrubal die?', next: 'death' },
      { label: 'What holds this city together?', next: 'silver' },
    ],
  },
  death: {
    text: 'In the night, in his own lodging. A Celt struck him down over a private grievance. For eight years he held Iberia, and he did it more by dealing with the local chiefs than by making war.',
    source: 'Polybius 2.36.1-2',
    next: 'ask_rest',
  },
  silver: {
    text: 'Silver. The mines nearby are said to be fabulously rich, and thousands of men dig them. That wealth is why Carthage wants this base, and why Rome watches it.',
    source: 'Strabo 3.2.10 (quoting Polybius); figures are reported, not verified',
    next: 'ask_rest',
  },
  ask_rest: {
    text: 'Ask what you will. Then hear what the men want.',
    options: [
      { label: 'What do the men want?', next: 'acclaim' },
    ],
  },
  acclaim: {
    text: 'You. The soldiers have named you general, young as you are. Some say the senate at Carthage must still confirm it, and Hanno and his friends are against you. Go and see the supplies on the quay: if we are to march, we must know what we hold.',
    source: 'Livy 21.3',
    end: true,
  },
};

export const OBJECTIVES = [
  'Find the veteran officer on the quay and talk to him.',
  'Inspect the supply crate near the water.',
  'Mission complete.',
];

export const CARD = {
  title: 'Hannibal takes command, 221 BCE',
  label: 'Reconstruction: the officer and the crate scene are invented composites for illustration. Hannibal\'s appearance, the harbor street and the clothing are not documented.',
  paragraphs: [
    'After Hasdrubal was murdered, command of the Carthaginian forces in Iberia passed to Hannibal, who was still young. The sources disagree about who chose him.',
    'Livy says the soldiers proclaimed him general, with Carthage expected to ratify and the people approving. Polybius says the Carthaginians appointed him, for his shrewdness and courage, without mentioning an army acclamation.',
    'New Carthage (modern Cartagena) was a working port of artisans, tradesmen and sailors, where Carthage stored money, war materiel and hostages. Polybius describes this for 209 BCE, so for 221 BCE it is an informed guess.',
  ],
  sources: [
    'Polybius, Histories 2.13, 2.36, 10.8-10',
    'Livy, History of Rome 21.3',
    'Strabo, Geography 3.2.10 (silver mines, via Polybius; figures debated)',
  ],
};

export const COMPLETE_TEXT = 'Mission complete. You learned how Hannibal came to command.';
