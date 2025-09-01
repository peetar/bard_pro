// Debug script to show getSongEffectTypes and getNonStackingIndices results for Purifying Rhythms, Purifying Chorus, and Psalm of Purity
import { getSongEffectTypes, getNonStackingIndices } from './App';

const SONGS = [
  {
    name: "Purifying Rhythms",
    effects: [
      "1: Effect type: Increase Magic Resist by 11 (L13) to 37 (L65)",
      "2: Effect type: Increase Poison Resist by 11 (L13) to 37 (L65)",
      "3: Effect type: Increase Disease Resist by 11 (L13) to 37 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 2 (L13) to 8 (L65), Everyone else by 2 (L13) to 5 (L65)"
    ]
  },
  {
    name: "Purifying Chorus",
    effects: [
      "1: Effect type: Increase Magic Resist by 43 (L56) to 47 (L65)",
      "2: Effect type: Increase Poison Resist by 43 (L56) to 47 (L65)",
      "3: Effect type: Increase Disease Resist by 43 (L56) to 47 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 1, Everyone else by 1"
    ]
  },
  {
    name: "Psalm of Purity",
    effects: [
      "1: Effect type: Increase Damage Shield by 8 (L37) to 12 (L65)",
      "2: Effect type: Increase Poison Resist by 47 (L37) to 75 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 4 (L37) to 8 (L65), Everyone else by 3 (L37) to 5 (L65)"
    ]
  }
];

console.log('getSongEffectTypes results:');
SONGS.forEach(song => {
  console.log(song.name, getSongEffectTypes(song));
});

console.log('\ngetNonStackingIndices results:');
console.log(getNonStackingIndices(SONGS));
