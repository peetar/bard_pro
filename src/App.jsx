import React, { useState } from 'react';
import './App.css';
import hymnIcon from './assets/hymn.gif';
import attackIcon from './assets/attack.gif';
import coldIcon from './assets/cold.gif';
import diseaseIcon from './assets/disease.gif';
import fireIcon from './assets/fire.gif';
import magicIcon from './assets/magic.gif';
import poisonIcon from './assets/poison.gif';
import thornsIcon from './assets/thorns.gif';

const GOALS = [
  { key: 'magicResist', label: 'Magic Resist' },
  { key: 'fireResist', label: 'Fire Resist' },
  { key: 'coldResist', label: 'Cold Resist' },
  { key: 'poisonResist', label: 'Poison Resist' },
  { key: 'diseaseResist', label: 'Disease Resist' },
  { key: 'attack', label: 'Attack' },
  { key: 'damageShield', label: 'Damage Shield' },
  { key: 'healthRegen', label: 'Health Regen' }
];

const INFO_COLUMNS = [
  ...GOALS,
  { key: 'haste', label: 'Haste' },
  { key: 'hasteV2', label: 'Haste v2' },
  { key: 'hasteV3', label: 'Haste v3' }
];

const SONGS = [
  {
    name: "Elemental Rhythms",
    level: 9,
    targetType: "Group",
    skill: "Percussion_instruments",
    goals: ["magicResist", "coldResist", "fireResist", "ac"],
    effects: [
      "1: Effect type: Increase Magic Resist by 9 (L9) to 37 (L65)",
      "2: Effect type: Increase Cold Resist by 9 (L9) to 37 (L65)",
      "3: Effect type: Increase Fire Resist by 9 (L9) to 37 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 2 (L9) to 8 (L65), Everyone else by 1 (L9) to 5 (L65)"
    ]
  },
  {
    name: "Magical Monologue",
    level: 9,
    targetType: "Self only",
    skill: "Singing",
    goals: ["utility"],
    effects: [
      "1: Effect type: Make Weapons Magical"
    ]
  },
  // {
  //   name: "Anthem de Arms",
  //   level: 10,
  //   targetType: "Group",
  //   skill: "Singing",
  //   goals: ["attack", "str"],
  //   effects: [
  //     "1: Effect type: Increase Attack Speed by 10%",
  //     "2: Effect type: Increase STR by 10 (L10) to 37 (L65)"
  //   ]
  // },
  // {
  //   name: "Cinda's Charismatic Carillon",
  //   level: 11,
  //   targetType: "Single target",
  //   skill: "Wind_instruments",
  //   goals: ["faction"],
  //   effects: [
  //     "1: Effect type: Increase Faction by 120 (L11) to 660 (L65)"
  //   ]
  // },
  // {
  //   name: "Brusco's Boastful Bellow",
  //   level: 12,
  //   targetType: "Single target",
  //   skill: "Singing",
  //   goals: ["damage"],
  //   effects: [
  //     "1: Effect type: Decrease Hitpoints by 7 (L12) to 34 (L65)"
  //   ]
  // },
  {
    name: "Purifying Rhythms",
    level: 13,
    targetType: "Group",
    skill: "Percussion_instruments",
    goals: ["magicResist", "poisonResist", "diseaseResist", "ac"],
    effects: [
      "1: Effect type: Increase Magic Resist by 11 (L13) to 37 (L65)",
      "2: Effect type: Increase Poison Resist by 11 (L13) to 37 (L65)",
      "3: Effect type: Increase Disease Resist by 11 (L13) to 37 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 2 (L13) to 8 (L65), Everyone else by 2 (L13) to 5 (L65)"
    ]
  },
  // {
  //   name: "Lyssa's Cataloging Libretto",
  //   level: 14,
  //   targetType: "Single target",
  //   skill: "Singing",
  //   goals: ["utility"],
  //   effects: [
  //     "1: Effect type: Identify"
  //   ]
  // },
  // {
  //   name: "Kelin's Lucid Lullaby",
  //   level: 15,
  //   targetType: "Single target",
  //   skill: "Stringed_instruments",
  //   goals: ["mez"],
  //   effects: [
  //     "1: Effect type: Mesmerize up to level 30"
  //   ]
  // },
  // {
  //   name: "Song of Sustenance",
  //   level: 15,
  //   targetType: "Group",
  //   skill: "Stringed_instruments",
  //   goals: ["utility"],
  //   effects: [
  //     "1: Effect type: Food/Water"
  //   ]
  // },
  // {
  //   name: "Tarew's Aquatic Ayre",
  //   level: 16,
  //   targetType: "Group",
  //   skill: "Wind_instruments",
  //   goals: ["utility"],
  //   effects: [
  //     "1: Effect type: WaterBreathing by 1"
  //   ]
  // },
  {
    name: "Guardian Rhythms",
    level: 17,
    targetType: "Group",
    skill: "Percussion_instruments",
    goals: ["ac", "magicResist"],
    effects: [
      "1: Effect type: Increase AC for Cloth Casters by 4 (L17) to 14 (L65), Everyone else by 3 (L17) to 10 (L65)",
      "2: Effect type: Increase Magic Resist by 13 (L17) to 37 (L65)"
    ]
  },
  {
    name: "Denon's Disruptive Discord",
    level: 18,
    targetType: "Area of effect around the caster",
    skill: "Brass_instruments",
    goals: ["damage", "acDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 9 (L18) to 21 (L65)",
      "2: Effect type: Decrease AC for Cloth Casters by 7 (L18) to 25 (L65), Everyone else by 4 (L18) to 18 (L65)"
    ]
  },
  // {
  //   name: "Shauri's Sonorous Clouding",
  //   level: 19,
  //   targetType: "Group",
  //   skill: "Wind_instruments",
  //   goals: ["invis", "seeInvis"],
  //   effects: [
  //     "1: Effect type: Invisibility by 1",
  //     "3: Effect type: See Invisible"
  //   ]
  // },
  {
    name: "Largo's Melodic Binding",
    level: 20,
    targetType: "Area of effect around the caster",
    skill: "Singing",
    goals: ["acDebuff", "attackSpeedDebuff"],
    effects: [
      "1: Effect type: Decrease AC for Cloth Casters by 5 (L20) to 14 (L65), Everyone else by 3 (L20) to 10 (L65)",
      "2: Effect type: Decrease Attack Speed by 35%"
    ]
  },
  {
    name: "Cassindra's Chant of Clarity",
    level: 20,
    targetType: "Group",
    skill: "Singing",
    goals: ["mana"],
    effects: [
      "2: Effect type: Increase Mana by 2"
    ]
  },
  // {
  //   name: "Melanie's Mellifluous Motion",
  //   level: 21,
  //   targetType: "Group",
  //   skill: "Wind_instruments",
  //   goals: ["utility"],
  //   effects: [
  //     "1: Effect type: Shadowstep"
  //   ]
  // },
  // {
  //   name: "Alenia's Disenchanting Melody",
  //   level: 22,
  //   targetType: "Group",
  //   skill: "Stringed_instruments",
  //   goals: ["utility"],
  //   effects: [
  //     "1: Effect type: Cancel Magic (1)"
  //   ]
  // },
  {
    name: "Selo's Consonant Chain",
    level: 23,
    targetType: "Single target",
    skill: "Singing",
    goals: ["movementDebuff", "attackSpeedDebuff"],
    effects: [
      "2: Effect type: Decrease Movement by 53% (L23) to 95% (L65)",
      "3: Effect type: Decrease Attack Speed by 40%"
    ]
  },
  // {
  //   name: "Lyssa's Veracious Concord",
  //   level: 24,
  //   targetType: "Group",
  //   skill: "Wind_instruments",
  //   goals: ["seeInvis", "ultravision"],
  //   effects: [
  //     "1: Effect type: See Invisible",
  //     "2: Effect type: Ultravision"
  //   ]
  // },
  {
    name: "Psalm of Warmth",
    level: 25,
    targetType: "Group",
    skill: "Singing",
    goals: ["damageShield", "coldResist", "infravision", "ac"],
    effects: [
      "1: Effect type: Increase Damage Shield by 6 (L25) to 12 (L65)",
      "2: Effect type: Increase Cold Resist by 35 (L25) to 75 (L65)",
      "3: Effect type: Infravision",
      "4: Effect type: Increase AC for Cloth Casters by 3 (L25) to 8 (L65), Everyone else by 2 (L25) to 5 (L65)"
    ]
  },
  // {
  //   name: "Angstlich's Appalling Screech",
  //   level: 26,
  //   targetType: "Area of effect around the caster",
  //   skill: "Brass_instruments",
  //   goals: ["fear"],
  //   effects: [
  //     "1: Effect type: Fear up to level 52"
  //   ]
  // },
  {
    name: "Solon's Song of the Sirens",
    level: 27,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["charm", "magicResistDebuff"],
    effects: [
      "1: Effect type: Charm up to level 37",
      "2: Effect type: Decrease Magic Resist by 5 (L27) to 10 (L65)"
    ]
  },
  {
    name: "Crission's Pixie Strike",
    level: 28,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["mez", "magicResistDebuff"],
    effects: [
      "1: Effect type: Mesmerize up to level 45",
      "2: Effect type: Decrease Magic Resist by 6 (L28) to 12 (L65)"
    ]
  },
  {
    name: "Psalm of Vitality",
    level: 29,
    targetType: "Group",
    skill: "Singing",
    goals: ["damageShield", "diseaseResist", "ac"],
    effects: [
      "1: Effect type: Increase Damage Shield by 6 (L29) to 12 (L65)",
      "2: Effect type: Increase Disease Resist by 39 (L29) to 75 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 4 (L29) to 8 (L65), Everyone else by 3 (L29) to 5 (L65)"
    ]
  },
  {
    name: "Fufil's Curtailing Chant",
    level: 30,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "magicResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 11 (L30) to 23 (L65)",
      "7: Effect type: Decrease Magic Resist by 10 (L30) to 19 (L65)"
    ]
  },
  {
    name: "Amplification",
    level: 30,
    targetType: "Self only",
    skill: "Singing",
    goals: ["singingSkill"],
    effects: [
      "1: Effect type: Increase Singing Skill by 5 (L30) to 10 (L65)"
    ]
  },
  // {
  //   name: "Agilmente's Aria of Eagles",
  //   level: 31,
  //   targetType: "Group",
  //   skill: "Wind_instruments",
  //   goals: ["levitate"],
  //   effects: [
  //     "1: Effect type: Levitate"
  //   ]
  // },
  {
    name: "Cassindra's Chorus of Clarity",
    level: 32,
    targetType: "Group",
    skill: "Singing",
    goals: ["mana"],
    effects: [
      "2: Effect type: Increase Mana by 5 (L32) to 7 (L48)"
    ]
  },
  {
    name: "Psalm of Cooling",
    level: 33,
    targetType: "Group",
    skill: "Singing",
    goals: ["damageShield", "fireResist", "ultravision", "ac"],
    effects: [
      "1: Effect type: Increase Damage Shield by 7 (L33) to 12 (L65)",
      "2: Effect type: Increase Fire Resist by 43 (L33) to 75 (L65)",
      "3: Effect type: Ultravision",
      "4: Effect type: Increase AC for Cloth Casters by 4 (L33) to 8 (L65), Everyone else by 3 (L33) to 5 (L65)"
    ]
  },
  // {
  //   name: "Lyssa's Solidarity of Vision",
  //   level: 34,
  //   targetType: "Single target",
  //   skill: "Wind_instruments",
  //   goals: ["bindSight"],
  //   effects: [
  //     "1: Effect type: Bind Sight"
  //   ]
  // },
  {
    name: "Cantata of Soothing",
    level: 34,
    targetType: "Group",
    skill: "Stringed_instruments",
    goals: ["healthRegen", "mana", "stamina"],
    effects: [
      "1: Effect type: Increase Hitpoints by 4",
      "2: Effect type: Increase Mana by 5 per tick (total 10)",
      "3: Effect type: Stamina by 4"
    ]
  },
  {
    name: "Denon's Dissension",
    level: 35,
    targetType: "Area of effect around the caster",
    skill: "Brass_instruments",
    goals: ["manaDebuff"],
    effects: [
      "1: Effect type: Decrease Mana by 23 (L35) to 38 (L65)"
    ]
  },
  // {
  //   name: "Vilia's Verses of Celerity",
  //   level: 36,
  //   targetType: "Group",
  //   skill: "Singing",
  //   goals: ["attack", "agi", "ac"],
  //   effects: [
  //     "1: Effect type: Increase Attack Speed by 20%",
  //     "2: Effect type: Increase AGI by 23 (L36) to 37 (L65)",
  //     "3: Effect type: Increase AC for Cloth Casters by 7 (L36) to 12 (L65), Everyone else by 4 (L36) to 9 (L65)"
  //   ]
  // },
  {
    name: "Psalm of Purity",
    level: 37,
    targetType: "Group",
    skill: "Singing",
    goals: ["damageShield", "poisonResist", "ac"],
    effects: [
      "1: Effect type: Increase Damage Shield by 8 (L37) to 12 (L65)",
      "2: Effect type: Increase Poison Resist by 47 (L37) to 75 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 4 (L37) to 8 (L65), Everyone else by 3 (L37) to 5 (L65)"
    ]
  },
  {
    name: "Tuyen's Chant of Flame",
    level: 38,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "fireResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 20 (L38) to 34 (L65)",
      "4: Effect type: Decrease Fire Resist by 12 (L38) to 19 (L65)"
    ]
  },
  {
    name: "Solon's Bewitching Bravura",
    level: 39,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["charm", "magicResistDebuff"],
    effects: [
      "1: Effect type: Charm up to level 51",
      "2: Effect type: Decrease Magic Resist by 6 (L39) to 10 (L65)"
    ]
  },
  {
    name: "Katta's Song of Sword Dancing",
    level: 39,
    targetType: "Group",
    skill: "Percussion_instruments",
    goals: ["proc", "dex"],
    effects: [
      "1: Effect type: Add Proc: Blade Dance",
      "4: Effect type: Increase DEX by 40"
    ]
  },
  {
    name: "Syvelian's Anti-Magic Aria",
    level: 40,
    targetType: "Single target",
    skill: "Singing",
    goals: ["utility"],
    effects: [
      "1: Effect type: Cancel Magic (4)"
    ]
  },
  {
    name: "Sionachie's Dreams",
    level: 40,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["mez", "magicResistDebuff"],
    effects: [
      "1: Effect type: Mesmerize up to level 53",
      "2: Effect type: Decrease Magic Resist by 8 (L40) to 12 (L65)"
    ]
  },
  {
    name: "Psalm of Mystic Shielding",
    level: 41,
    targetType: "Group",
    skill: "Singing",
    goals: ["magicResist", "absorbMagic", "healthRegen", "ac"],
    effects: [
      "1: Effect type: Increase Magic Resist by 51 (L41) to 75 (L65)",
      "2: Effect type: Increase Absorb Magic Damage by 15",
      "3: Effect type: Increase Hitpoints by 5",
      "4: Effect type: Increase AC for Cloth Casters by 5 (L41) to 8 (L65), Everyone else by 3 (L41) to 5 (L65)"
    ]
  },
  // {
  //   name: "McVaxius' Berserker Crescendo",
  //   level: 42,
  //   targetType: "Group",
  //   skill: "Brass_instruments",
  //   goals: ["attack", "str", "ac"],
  //   effects: [
  //     "1: Effect type: Increase Attack Speed by 18% (L42) to 24% (L65)",
  //     "2: Effect type: Increase STR by 15 (L42) to 22 (L65)",
  //     "3: Effect type: Increase AC for Cloth Casters by 8 (L42) to 12 (L65), Everyone else by 5 (L42) to 9 (L65)"
  //   ]
  // },
  {
    name: "Tuyen's Chant of Disease",
    level: 42,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "diseaseResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 22 (L42) to 34 (L65)",
      "4: Effect type: Decrease Disease Resist by 13 (L42) to 19 (L65)"
    ]
  },
  {
    name: "Cassindra's Elegy",
    level: 44,
    targetType: "Group",
    skill: "Singing",
    goals: ["int", "wis"],
    effects: [
      "2: Effect type: Increase INT by 12 (L44) to 17 (L65)",
      "3: Effect type: Increase WIS by 12 (L44) to 17 (L65)"
    ]
  },
  {
    name: "Jonthan's Provocation",
    level: 45,
    targetType: "Self only",
    skill: "Singing",
    goals: ["attackSpeed", "str", "atk"],
    effects: [
      "1: Effect type: Increase Attack Speed by 48% (L45) to 50% (L47)",
      "2: Effect type: Increase STR by 13 (L45) to 18 (L65)",
      "4: Effect type: Increase ATK by 13 (L45) to 18 (L65)"
    ]
  },
  {
    name: "Aria of Asceticism",
    level: 45,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["poisonCounterDebuff", "diseaseCounterDebuff"],
    effects: [
      "1: Effect type: Decrease Poison Counter by 8 (L45) to 11 (L65)",
      "2: Effect type: Decrease Disease Counter by 8 (L45) to 11 (L65)"
    ]
  },
  {
    name: "Tuyen's Chant of Frost",
    level: 46,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "coldResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 24 (L46) to 34 (L65)",
      "4: Effect type: Decrease Cold Resist by 14 (L46) to 19 (L65)"
    ]
  },
  {
    name: "Niv's Melody of Preservation",
    level: 47,
    targetType: "Group",
    skill: "Stringed_instruments",
    goals: ["str", "absorbMagic", "healthRegen"],
    effects: [
      "1: Effect type: Increase STR by 10",
      "2: Effect type: Increase Absorb Magic Damage by 10",
      "3: Effect type: Increase Hitpoints by 6 (L47) to 9 (L65)"
    ]
  },
  {
    name: "Selo's Chords of Cessation",
    level: 48,
    targetType: "Area of effect around the caster",
    skill: "Stringed_instruments",
    goals: ["damage", "attackSpeedDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 26 (L48) to 35 (L65)",
      "6: Effect type: Decrease Attack Speed by 25%"
    ]
  },
  {
    name: "Shield of Songs",
    level: 49,
    targetType: "Group",
    skill: "Stringed_instruments",
    goals: ["absorbDamage", "absorbMagic"],
    effects: [
      "1: Effect type: Increase Absorb Damage by 20",
      "2: Effect type: Increase Absorb Magic Damage by 20"
    ]
  },
  {
    name: "Selo's Accelerating Chorus",
    level: 49,
    targetType: "Group",
    skill: "Percussion_instruments",
    goals: ["movement"],
    effects: [
      "1: Effect type: Increase Movement by 64% (L49) to 65% (L50)"
    ]
  },
  // {
  //   name: "Verses of Victory",
  //   level: 50,
  //   targetType: "Group",
  //   skill: "Singing",
  //   goals: ["attack", "agi", "ac", "str"],
  //   effects: [
  //     "1: Effect type: Increase Attack Speed by 30%",
  //     "2: Effect type: Increase AGI by 30",
  //     "3: Effect type: Increase AC for Cloth Casters by 18, Everyone else by 14",
  //     "4: Effect type: Increase STR by 30"
  //   ]
  // },
  {
    name: "Melody of Ervaj",
    level: 50,
    targetType: "Group",
    skill: "Brass_instruments",
    goals: ["haste", "ac", "atk", "attack"],
    effects: [
      "1: Effect type: Increase Haste v2 by 105%",
      "4: Effect type: Increase AC for Cloth Casters by 5 (L50) to 8 (L65), Everyone else by 4 (L50) to 5 (L65)"
    ]
  },
  {
    name: "Tuyen's Chant of Poison",
    level: 50,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "poisonResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 26 (L50) to 34 (L65)",
      "4: Effect type: Decrease Poison Resist by 15 (L50) to 19 (L65)"
    ]
  },
  {
    name: "Selo's Song of Travel",
    level: 51,
    targetType: "Group",
    skill: "Percussion_instruments",
    goals: ["movement", "invis", "seeInvis", "levitate"],
    effects: [
      "1: Effect type: Increase Movement by 65%",
      "2: Effect type: Invisibility by 1",
      "3: Effect type: See Invisible",
      "4: Effect type: Levitate"
    ]
  },
  {
    name: "Largo's Absonant Binding",
    level: 51,
    targetType: "Single target",
    skill: "Singing",
    goals: ["acDebuff", "attackSpeedDebuff", "movementDebuff", "agiDebuff"],
    effects: [
      "1: Effect type: Decrease AC for Cloth Casters by 20 (L51) to 25 (L65), Everyone else by 15 (L51) to 18 (L65)",
      "2: Effect type: Decrease Attack Speed by 35%",
      "3: Effect type: Decrease Movement by 52% (L51) to 66% (L65)",
      "4: Effect type: Decrease AGI by 46 (L51) to 53 (L65)"
    ]
  },
  {
    name: "Nillipus' March of the Wee",
    level: 52,
    targetType: "Group",
    skill: "Percussion_instruments",
    goals: ["ac", "agi", "absorbDamage"],
    effects: [
      "1: Effect type: Increase AC for Cloth Casters by 11, Everyone else by 9",
      "3: Effect type: Increase AGI by 18",
      "4: Effect type: Increase Absorb Damage by 12"
    ]
  },
  {
    name: "Battlecry of the Vah Shir",
    level: 52,
    targetType: "Group",
    skill: "Brass_instruments",
    goals: ["haste", "atk", "attack"],
    effects: [
      "1: Effect type: Increase Haste v3 by 15%"
    ]
  },
  {
    name: "Aria of Innocence",
    level: 52,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["curseCounterDebuff"],
    effects: [
      "1: Effect type: Decrease Curse Counter by 2",
      "2: Effect type: Decrease Curse Counter by 2"
    ]
  },
  {
    name: "Song of Twilight",
    level: 53,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["mez", "magicResistDebuff"],
    effects: [
      "1: Effect type: Mesmerize up to level 55",
      "5: Effect type: Decrease Magic Resist by 15 (L53) to 18 (L65)"
    ]
  },
  {
    name: "Song of Dawn",
    level: 53,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["hateDebuff"],
    effects: [
      "1: Effect type: Decrease hate by 182 (L53) to 188 (L65)"
    ]
  },
  {
    name: "Vilia's Chorus of Celerity",
    level: 54,
    targetType: "Group",
    skill: "Singing",
    goals: ["attack"],
    effects: [
      "1: Effect type: Increase Attack Speed by 45%"
    ]
  },
  {
    name: "Selo's Assonant Strane",
    level: 54,
    targetType: "Area of effect around the caster",
    skill: "Stringed_instruments",
    goals: ["movementDebuff", "attackSpeedDebuff"],
    effects: [
      "1: Effect type: Decrease Movement by 44% (L54) to 47% (L65)",
      "2: Effect type: Decrease Attack Speed by 40%"
    ]
  },
  {
    name: "Elemental Chorus",
    level: 54,
    targetType: "Friendly area of effect",
    skill: "Percussion_instruments",
    goals: ["magicResist", "coldResist", "fireResist", "ac"],
    effects: [
      "1: Effect type: Increase Magic Resist by 42 (L54) to 47 (L65)",
      "2: Effect type: Increase Cold Resist by 42 (L54) to 47 (L65)",
      "3: Effect type: Increase Fire Resist by 42 (L54) to 47 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 1, Everyone else by 1"
    ]
  },
  {
    name: "Occlusion of Sound",
    level: 55,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["coldResistDebuff", "fireResistDebuff", "magicResistDebuff"],
    effects: [
      "1: Effect type: Decrease Cold Resist by 10",
      "2: Effect type: Decrease Fire Resist by 10",
      "4: Effect type: Decrease Magic Resist by 10"
    ]
  },
  {
    name: "Brusco's Bombastic Bellow",
    level: 55,
    targetType: "Single target",
    skill: "Singing",
    goals: ["stun", "damage"],
    effects: [
      "1: Effect type: Stun (8.0 sec)",
      "2: Effect type: Decrease Hitpoints by 222"
    ]
  },
  {
    name: "Cantata of Replenishment",
    level: 55,
    targetType: "Group",
    skill: "Stringed_instruments",
    goals: ["healthRegen", "mana", "stamina"],
    effects: [
      "1: Effect type: Increase Hitpoints by 11 (L55) to 13 (L65)",
      "2: Effect type: Increase Mana by 10 (L55) to 11 (L65) per tick (total 20 to 22)",
      "3: Effect type: Stamina by 10"
    ]
  },
  {
    name: "Song of Highsun",
    level: 56,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["cancelMagic", "stun", "shadowstep"],
    effects: [
      "1: Effect type: Cancel Magic (9)",
      "2: Effect type: Cancel Magic (9)",
      "3: Effect type: Stun (0.001 sec)",
      "4: Effect type: Shadowstep"
    ]
  },
  {
    name: "Song of Midnight",
    level: 56,
    targetType: "Area of effect around the caster",
    skill: "Brass_instruments",
    goals: ["fear", "damage", "movement"],
    effects: [
      "1: Effect type: Fear up to level 52",
      "2: Effect type: Decrease Hitpoints by 8 (L56) to 10 (L65)",
      "3: Effect type: Increase Movement by 45%"
    ]
  },
  {
    name: "Purifying Chorus",
    level: 56,
    targetType: "Friendly area of effect",
    skill: "Percussion_instruments",
    goals: ["magicResist", "poisonResist", "diseaseResist", "ac"],
    effects: [
      "1: Effect type: Increase Magic Resist by 43 (L56) to 47 (L65)",
      "2: Effect type: Increase Poison Resist by 43 (L56) to 47 (L65)",
      "3: Effect type: Increase Disease Resist by 43 (L56) to 47 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 1, Everyone else by 1"
    ]
  },
  {
    name: "McVaxius' Rousing Rondo",
    level: 57,
    targetType: "Group",
    skill: "Brass_instruments",
    goals: ["attackSpeed", "str", "atk", "damageShield"],
    effects: [
      "1: Effect type: Increase Attack Speed by 19% (L57) to 20% (L65)",
      "2: Effect type: Increase STR by 20 (L57) to 22 (L65)",
      "3: Effect type: Increase ATK by 11 (L57) to 12 (L65)",
      "4: Effect type: Increase Damage Shield by 8"
    ]
  },
  {
    name: "Cassindra's Insipid Ditty",
    level: 57,
    targetType: "Single target",
    skill: "Stringed_instruments",
    goals: ["manaDebuff", "intDebuff", "wisDebuff"],
    effects: [
      "1: Effect type: Decrease Mana by 16 (L57) to 18 (L65) per tick (total 32 to 36)",
      "2: Effect type: Decrease INT by 16 (L57) to 18 (L65)",
      "4: Effect type: Decrease WIS by 16 (L57) to 18 (L65)"
    ]
  },
  {
    name: "Dreams of Ayonae",
    level: 58,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["mez", "memblur"],
    effects: [
      "1: Effect type: Mesmerize up to level 57",
      "2: Effect type: Memblur (30%)"
    ]
  },
  {
    name: "Jonthan's Inspiration",
    level: 58,
    targetType: "Self only",
    skill: "Singing",
    goals: ["attackSpeed", "str", "atk"],
    effects: [
      "1: Effect type: Increase Attack Speed by 61% (L58) to 66% (L63)",
      "2: Effect type: Increase STR by 17 (L58) to 19 (L65)",
      "4: Effect type: Increase ATK by 13 (L58) to 14 (L65)"
    ]
  },
  {
    name: "Niv's Harmonic",
    level: 58,
    targetType: "Group",
    skill: "Singing",
    goals: ["absorbMagic", "ac"],
    effects: [
      "1: Effect type: Increase Absorb Magic Damage by 10",
      "2: Effect type: Increase AC for Cloth Casters by 30, Everyone else by 23"
    ]
  },
  {
    name: "Chorus of Replenishment",
    level: 58,
    targetType: "Friendly area of effect",
    skill: "Stringed_instruments",
    goals: ["healthRegen", "mana", "stamina"],
    effects: [
      "1: Effect type: Increase Hitpoints by 12 (L58) to 13 (L65)",
      "2: Effect type: Increase Mana by 10 (L58) to 11 (L65) per tick (total 20 to 22)",
      "3: Effect type: Stamina by 10"
    ]
  },
  {
    name: "Denon's Bereavement",
    level: 59,
    targetType: "Area of effect around the caster",
    skill: "Stringed_instruments",
    goals: ["poisonCounter", "damage", "stun", "magicResistDebuff"],
    effects: [
      "1: Effect type: Increase Poison Counter by 4",
      "2: Effect type: Decrease Hitpoints by 30",
      "3: Effect type: Stun (0.001 sec)",
      "4: Effect type: Decrease Magic Resist by 15"
    ]
  },
  {
    name: "Solon's Charismatic Concord",
    level: 59,
    targetType: "Group",
    skill: "Singing",
    goals: ["cha"],
    effects: [
      "1: Effect type: Increase CHA by 45"
    ]
  },
  {
    name: "Anc: Rytan's Dirge of Death",
    level: 60,
    targetType: "Group",
    skill: "Wind_instruments",
    goals: ["feignDeath"],
    effects: [
      "1: Effect type: Feign Death"
    ]
  },
  {
    name: "Ancient: Lcea's Lament",
    level: 60,
    targetType: "Friendly area of effect",
    skill: "Stringed_instruments",
    goals: ["healthRegen", "mana", "stamina"],
    effects: [
      "1: Effect type: Increase Hitpoints by 16 (L60) to 17 (L65)",
      "2: Effect type: Increase Mana by 15 per tick (total 30)",
      "3: Effect type: Stamina by 10"
    ]
  },
  {
    name: "Ancient: Lullaby of Shadow",
    level: 60,
    targetType: "Single target",
    skill: "Singing",
    goals: ["mez", "memblur"],
    effects: [
      "1: Effect type: Mesmerize up to level 59",
      "2: Effect type: Memblur (40%)"
    ]
  },
  {
    name: "Composition of Ervaj",
    level: 60,
    targetType: "Group",
    skill: "Brass_instruments",
    goals: ["haste", "ac", "atk", "attack"],
    effects: [
      "1: Effect type: Increase Haste v2 by 110%",
      "4: Effect type: Increase AC for Cloth Casters by 11, Everyone else by 8"
    ]
  },
  {
    name: "Angstlich's Assonance",
    level: 60,
    targetType: "Single target",
    skill: "Brass_instruments",
    goals: ["attackSpeedDebuff", "damage"],
    effects: [
      "1: Effect type: Decrease Attack Speed by 40%",
      "2: Effect type: Decrease Hitpoints by 25 (L60) to 27 (L65)"
    ]
  },
  {
    name: "Kazumi's Note of Preservation",
    level: 60,
    targetType: "Group",
    skill: "Wind_instruments",
    goals: ["invulnerability"],
    effects: [
      "1: Effect type: Invunerability"
    ]
  },
  {
    name: "Warsong of the Vah Shir",
    level: 60,
    targetType: "Group",
    skill: "Brass_instruments",
    goals: ["haste", "atk", "attack"],
    effects: [
      "1: Effect type: Increase Haste v3 by 25%"
    ]
  },
  {
    name: "Ervaj's Lost Composition",
    level: 60,
    targetType: "Single target",
    skill: "Brass_instruments",
    goals: ["manaDebuff"],
    effects: [
      "1: Effect type: Decrease Mana by 220"
    ]
  },
  {
    name: "Silent Song of Quellious",
    level: 61,
    targetType: "Single target",
    skill: "Singing",
    goals: ["utility"],
    effects: [
      "1: Effect type: Frenzy Radius (5/65)",
      "2: Effect type: Reaction Radius (10/65)",
      "3: Effect type: Pacify"
    ]
  },
  {
    name: "Tuyen's Chant of the Plague",
    level: 61,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "diseaseResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 41 (L61) to 43 (L65)",
      "4: Effect type: Decrease Disease Resist by 22 (L61) to 23 (L65)"
    ]
  },
  {
    name: "Saryrn's Scream of Pain",
    level: 61,
    targetType: "Single target",
    skill: "Singing",
    goals: ["damage"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 62 (L61) to 66 (L65)"
    ]
  },
  {
    name: "Dreams of Thule",
    level: 62,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["mez"],
    effects: [
      "1: Effect type: Mesmerize up to level 62"
    ]
  },
  {
    name: "Druzzil's Disillusionment",
    level: 62,
    targetType: "Single target",
    skill: "Singing",
    goals: ["cancelMagic"],
    effects: [
      "1: Effect type: Cancel Magic (9)",
      "2: Effect type: Cancel Magic (9)"
    ]
  },
  {
    name: "Melody of Mischief",
    level: 62,
    targetType: "Area of effect around the caster",
    skill: "Stringed_instruments",
    goals: ["damage", "attackSpeedDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 35 (L62) to 37 (L65)",
      "6: Effect type: Decrease Attack Speed by 45%"
    ]
  },
  {
    name: "Warsong of Zek",
    level: 62,
    targetType: "Group",
    skill: "Brass_instruments",
    goals: ["attackSpeed", "str", "atk", "damageShield"],
    effects: [
      "1: Effect type: Increase Attack Speed by 60%",
      "2: Effect type: Increase STR by 36 (L62) to 37 (L65)",
      "3: Effect type: Increase ATK by 17 (L62) to 18 (L65)",
      "4: Effect type: Increase Damage Shield by 15"
    ]
  },
  {
    name: "Wind of Marr",
    level: 62,
    targetType: "Group",
    skill: "Stringed_instruments",
    goals: ["healthRegen", "mana", "stamina"],
    effects: [
      "1: Effect type: Increase Hitpoints by 19 (L62) to 20 (L65)",
      "2: Effect type: Increase Mana by 18 per tick (total 36)",
      "3: Effect type: Stamina by 20"
    ]
  },
  {
    name: "Psalm of Veeshan",
    level: 63,
    targetType: "Group",
    skill: "Singing",
    goals: ["damageShield", "allResists", "ac"],
    effects: [
      "1: Effect type: Increase Damage Shield by 13",
      "2: Effect type: Increase All Resists by 73 (L63) to 75 (L65)",
      "4: Effect type: Increase AC for Cloth Casters by 9, Everyone else by 7"
    ]
  },
  {
    name: "Tuyen's Chant of Venom",
    level: 63,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "poisonResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 42 (L63) to 43 (L65)",
      "4: Effect type: Decrease Poison Resist by 22 (L63) to 23 (L65)"
    ]
  },
  {
    name: "Tuyen's Chant of Ice",
    level: 63,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "coldResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 42 (L63) to 43 (L65)",
      "4: Effect type: Decrease Cold Resist by 22 (L63) to 23 (L65)"
    ]
  },
  {
    name: "Requiem of Time",
    level: 64,
    targetType: "Single target",
    skill: "Brass_instruments",
    goals: ["attackSpeedDebuff"],
    effects: [
      "1: Effect type: Decrease Attack Speed by 55%"
    ]
  },
  {
    name: "Rizlona's Call of Flame",
    level: 64,
    targetType: "Group",
    skill: "Singing",
    goals: ["spellDamage", "haste", "limit", "atk", "attack"],
    effects: [
      "1: Effect type: Increase Spell Damage by 15%",
      "2: Effect type: Increase Haste v3 by 30%"
    ]
  },
  {
    name: "Dreams of Terris",
    level: 64,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["mez"],
    effects: [
      "1: Effect type: Mesmerize up to level 65"
    ]
  },
  {
    name: "Call of the Banshee",
    level: 64,
    targetType: "Single target",
    skill: "Wind_instruments",
    goals: ["charm"],
    effects: [
      "1: Effect type: Charm up to level 57"
    ]
  },
  {
    name: "Chorus of Marr",
    level: 64,
    targetType: "Friendly area of effect",
    skill: "Stringed_instruments",
    goals: ["healthRegen", "mana", "stamina"],
    effects: [
      "1: Effect type: Increase Hitpoints by 20",
      "2: Effect type: Increase Mana by 18 per tick (total 36)",
      "3: Effect type: Stamina by 20"
    ]
  },
  {
    name: "Tuyen's Chant of Fire",
    level: 65,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["damage", "fireResistDebuff"],
    effects: [
      "1: Effect type: Decrease Hitpoints by 43",
      "4: Effect type: Decrease Fire Resist by 23"
    ]
  },
  {
    name: "Harmony of Sound",
    level: 65,
    targetType: "Single target",
    skill: "Percussion_instruments",
    goals: ["coldResistDebuff", "fireResistDebuff", "magicResistDebuff"],
    effects: [
      "1: Effect type: Decrease Cold Resist by 15",
      "2: Effect type: Decrease Fire Resist by 15",
      "4: Effect type: Decrease Magic Resist by 15"
    ]
  },
  {
    name: "Lullaby of Morell",
    level: 65,
    targetType: "Single target",
    skill: "Singing",
    goals: ["mez"],
    effects: [
      "1: Effect type: Mesmerize up to level 68"
    ]
  }
];

// For each song, if any effect includes 'Increase ATK', add 'attack' to its goals if not present
SONGS.forEach(song => {
  const hasAtkEffect = song.effects.some(e => e.includes('Increase ATK'));
  if (hasAtkEffect && !song.goals.includes('attack')) {
    song.goals.push('attack');
  }
});

// For each song with targetType "Self only", add (Self) to the name if not already present
SONGS.forEach(song => {
  if (song.targetType === "Self only" && !song.name.endsWith(" (Self)")) {
    song.name += " (Self)";
  }
});

function getRecommendedSongs(selectedGoals) {
  if (selectedGoals.length === 0) return [];
  // Show songs that match ANY selected goal
  return SONGS.filter(song =>
    song.goals.some(goal => selectedGoals.includes(goal))
  );
}

function App() {
  // Skill type to icon mapping (using emoji for simplicity)
  const SKILL_ICONS = {
    Percussion_instruments: '🥁',
    Singing: '🎤',
    Wind_instruments: '🎷',
    Brass_instruments: '🎺',
    Stringed_instruments: '🎸'
  };
  const [amplificationActive, setAmplificationActive] = useState(false);
  const [puretoneActive, setPuretoneActive] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [includePoP, setIncludePoP] = useState(false);
  const [haveEpic, setHaveEpic] = useState(true);
  const [instrumentMastery, setInstrumentMastery] = useState(0);
  const [singingMastery, setSingingMastery] = useState(0);
  const [singingClicky, setSingingClicky] = useState(1); // 1=None, 2=VOTS, 3=Shei cloak
  const [percussionInstrument, setPercussionInstrument] = useState(0); // 0=None, 1=Combine, 2=Selo, 3=DoTB
  const [brassInstrument, setBrassInstrument] = useState(0); // 0=None, 1=Combine, 2=McVax, 3=Immaculate, 4=Denon
  const [stringedInstrument, setStringedInstrument] = useState(0); // 0=None, 1=Combine, 2=Kelin, 3=Lyran
  const PERCUSSION_OPTIONS = [
    { label: "None", mod: 0 },
    { label: "Combine", mod: 1.0 },
    { label: "Selo", mod: 1.4 },
    { label: "DoTB", mod: 1.6 }
  ];
  const BRASS_OPTIONS = [
    { label: "None", mod: 0 },
    { label: "Combine 1.2", mod: 1.2 },
    { label: "McVax 1.3", mod: 1.3 },
    { label: "Immaculate 1.4", mod: 1.4 },
    { label: "Denon 1.4", mod: 1.4 }
  ];
  const STRINGED_OPTIONS = [
    { label: "None", mod: 0 },
    { label: "Combine 1.2", mod: 1.2 },
    { label: "Kelin 1.4", mod: 1.4 },
    { label: "Lyran 1.5", mod: 1.5 }
  ];

  const handleGoalChange = (goalKey) => {
    setSelectedGoals((prev) =>
      prev.includes(goalKey)
        ? prev.filter((g) => g !== goalKey)
        : [...prev, goalKey]
    );
  };

  // Filter songs by level
  const filteredSongs = SONGS.filter(song => includePoP ? song.level <= 65 : song.level <= 60);
  // Pass filteredSongs to getRecommendedSongs
  function getRecommendedSongsFiltered(selectedGoals) {
    if (selectedGoals.length === 0) return [];
    return filteredSongs.filter(song =>
      song.goals.some(goal => selectedGoals.includes(goal))
    );
  }
  const recommendedSongs = getRecommendedSongsFiltered(selectedGoals);

  // Helper to parse effect value for a goal at a given level
  function getEffectValue(song, key, level = 60) {
  if (!song || !song.effects) return '';
  // Use the correct skill mod for this song
  const instrumentMod = getSkillMod(song.skill);
    // Haste columns are never modified
    if (key === 'haste') {
      const effectStr = song.effects.find(e => /Increase Attack Speed by \d+%/.test(e));
      if (effectStr) {
        const match = effectStr.match(/Increase Attack Speed by (\d+)%/);
        if (match) return match[1] + '%';
      }
      return '';
    }
    if (key === 'hasteV2') {
      const effectStr = song.effects.find(e => /Increase Haste v2 by \d+%/.test(e));
      if (effectStr) {
        const match = effectStr.match(/Increase Haste v2 by (\d+)%/);
        if (match) {
          const val = parseInt(match[1], 10) - 100;
          if (val > 0) return val + '%';
          return '';
        }
      }
      return '';
    }
    if (key === 'hasteV3') {
      const effectStr = song.effects.find(e => /Increase Haste v3 by \d+%/.test(e));
      if (effectStr) {
        const match = effectStr.match(/Increase Haste v3 by (\d+)%/);
        if (match) return match[1] + '%';
      }
      return '';
    }
    // Map goalKey to effect type string
    const effectTypeMap = {
      magicResist: 'Increase Magic Resist',
      fireResist: 'Increase Fire Resist',
      coldResist: 'Increase Cold Resist',
      poisonResist: 'Increase Poison Resist',
      diseaseResist: 'Increase Disease Resist',
      attack: 'Increase ATK',
      damageShield: 'Increase Damage Shield',
      healthRegen: 'Increase Hitpoints',
    };
    const effectType = effectTypeMap[key];
    if (!effectType) return '';
    const effectStr = song.effects.find(e => e.includes(effectType));
    if (!effectStr) return '';
    // Try to extract value for (Lx) to (Ly) pattern
    const match = effectStr.match(/by (\d+) \(L(\d+)\) to (\d+) \(L(\d+)\)/);
    if (match) {
      const vStart = parseInt(match[1], 10);
      const lStart = parseInt(match[2], 10);
      const vEnd = parseInt(match[3], 10);
      const lEnd = parseInt(match[4], 10);
      let val;
      if (level <= lStart) val = vStart;
      else if (level >= lEnd) val = vEnd;
      else {
        const slope = (vEnd - vStart) / (lEnd - lStart);
        val = Math.round(vStart + slope * (level - lStart));
      }
      return Math.floor(val * instrumentMod);
    }
    // Try to extract value for 'by (\d+)' pattern (no range)
    const match2 = effectStr.match(/by (\d+)/);
    if (match2) {
      return Math.floor(parseInt(match2[1], 10) * instrumentMod);
    }
    return '';
  }

  // Helper: get effect types for a song (for stacking logic)
  function getSongEffectTypes(song) {
    if (!song || !song.effects) return [];
    // Only include effects with a numeric value or 'by' in effectType
    return song.effects.map(e => {
      // Match slot number and effect type
      const m = e.match(/^([0-9]+): Effect type: ([^\(,]+)/);
      if (m) {
        const effectType = m[2].trim();
        // Only include if effectType contains 'by' or a digit
        if (/by|\d/.test(effectType)) {
          return { slot: parseInt(m[1], 10), effectType };
        }
      }
      return null;
    }).filter(Boolean);
  }

  // Find non-stacking songs in the melody slots
  function getNonStackingIndices(songs) {
    // For each slot, store an array of stacking conflicts: {conflictIdx, slot, effectType}
    const stackingConflicts = Array(songs.length).fill(null).map(() => []);
    const songEffects = songs.map(song => song ? getSongEffectTypes(song) : []);
    // Helper to normalize effectType: only compare text before 'by', ignore numbers
    function normalizeEffectType(effectType) {
      const idx = effectType.toLowerCase().indexOf(' by');
      return idx !== -1 ? effectType.slice(0, idx).trim().toLowerCase() : effectType.trim().toLowerCase();
    }
    for (let i = 0; i < songs.length; i++) {
      if (!songs[i]) continue;
      for (const effA of songEffects[i]) {
        for (let j = 0; j < i; j++) {
          if (!songs[j]) continue;
          for (const effB of songEffects[j]) {
            // If slot number matches and effectType matches (ignoring numbers after 'by')
            if (
              effA.slot === effB.slot &&
              normalizeEffectType(effA.effectType) === normalizeEffectType(effB.effectType)
            ) {
              // Add a conflict for each slot/effectType
              stackingConflicts[i].push({ conflictIdx: j, slot: effA.slot, effectType: effA.effectType });
              stackingConflicts[j].push({ conflictIdx: i, slot: effB.slot, effectType: effB.effectType });
            }
          }
        }
      }
    }
    return stackingConflicts;
  }

// Debug output for stacking logic for three songs
const debugSongs = [
  SONGS.find(s => s.name === "Purifying Rhythms"),
  SONGS.find(s => s.name === "Purifying Chorus"),
  SONGS.find(s => s.name === "Psalm of Purity")
];
debugSongs.forEach(song => {
  if (song) {
    console.log(`Debug: getSongEffectTypes for ${song.name}:`, getSongEffectTypes(song));
  }
});
console.log(
  "Debug: getNonStackingIndices for [Purifying Rhythms, Purifying Chorus, Psalm of Purity]:",
  getNonStackingIndices(debugSongs)
);

  const MELODY_SLOTS = 30;
  const [removedIndices, setRemovedIndices] = useState([]);
  const melodySongs = [...Array(MELODY_SLOTS)].map((_, idx) =>
    removedIndices.includes(idx) ? null : (recommendedSongs[idx] || null)
  );
  const stackingConflicts = getNonStackingIndices(melodySongs);

  // Reset removed songs when goals change
  React.useEffect(() => {
    setRemovedIndices([]);
  }, [selectedGoals, includePoP]);

  // Skill names for modifier table
  const SKILLS = [
    { key: 'Percussion', label: 'Percussion' },
    { key: 'Stringed', label: 'Stringed' },
    { key: 'Wind', label: 'Wind' },
    { key: 'Brass', label: 'Brass' },
    { key: 'Singing', label: 'Singing' }
  ];
  // Calculate per-skill modifier
  function getSkillMod(skillKey) {
    // Epic is +0.8 mod to all types, does not stack with higher instrument mod
    // Puretone overrides instrument mod to 1.8 for all types
    let mod;
    if (puretoneActive) {
      if (skillKey === 'Singing') {
        let clickyMod = 0;
        if (singingClicky === 2) clickyMod = 0.6;
        if (singingClicky === 3) clickyMod = 0.9;
        let ampMod = amplificationActive ? 0.9 : 0;
        mod = 1.0 + 1.8 + singingMastery * 0.2 + clickyMod + ampMod;
      } else {
        let masteryMod = instrumentMastery * 0.2;
        mod = 1.0 + 1.8 + masteryMod;
      }
    } else {
      let masteryMod = instrumentMastery * 0.2;
      if (skillKey === 'Singing') {
        let clickyMod = 0;
        if (singingClicky === 2) clickyMod = 0.6;
        if (singingClicky === 3) clickyMod = 0.9;
        let ampMod = amplificationActive ? 0.9 : 0;
        let epicMod = haveEpic ? 0.8 : 0;
        mod = 1.0 + epicMod + singingMastery * 0.2 + clickyMod + ampMod;
      } else {
        let instrumentMod = 0;
        if (skillKey === 'Percussion') {
          instrumentMod = PERCUSSION_OPTIONS[percussionInstrument]?.mod || 0;
        }
        if (skillKey === 'Brass') {
          instrumentMod = BRASS_OPTIONS[brassInstrument]?.mod || 0;
        }
        if (skillKey === 'Stringed') {
          instrumentMod = STRINGED_OPTIONS[stringedInstrument]?.mod || 0;
        }
        if (skillKey === 'Wind') {
          instrumentMod = 0;
        }
        // Epic acts as a 0.8 mod instrument for all types if instrument mod is less than 0.8
        let epicMod = haveEpic ? 0.8 : 0;
        let finalInstrumentMod = instrumentMod < epicMod ? epicMod : instrumentMod;
        mod = 1.0 + finalInstrumentMod + masteryMod;
      }
    }
    return Math.min(mod, 3.6);
  }

  return (
    <div className="container">
      <h1>Bard Melody Selector</h1>
      <table className="controls-table" style={{ marginBottom: '1em', minWidth: '350px' }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Have Epic?</td>
            <td>
              <input
                type="checkbox"
                checked={haveEpic}
                onChange={() => setHaveEpic((v) => !v)}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Amplification active?</td>
            <td>
              <input
                type="checkbox"
                checked={amplificationActive}
                onChange={() => setAmplificationActive((v) => !v)}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Puretone active?</td>
            <td>
              <input
                type="checkbox"
                checked={puretoneActive}
                onChange={() => setPuretoneActive((v) => !v)}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Drum (Percussion) Instrument</td>
            <td>
              {PERCUSSION_OPTIONS.map((opt, idx) => (
                <label key={opt.label} style={{ marginRight: '0.5em' }}>
                  <input
                    type="radio"
                    name="percussionInstrument"
                    value={idx}
                    checked={percussionInstrument === idx}
                    onChange={() => setPercussionInstrument(idx)}
                  />
                  {opt.label}
                </label>
              ))}
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Stringed Instrument</td>
            <td>
              {STRINGED_OPTIONS.map((opt, idx) => (
                <label key={opt.label} style={{ marginRight: '0.5em' }}>
                  <input
                    type="radio"
                    name="stringedInstrument"
                    value={idx}
                    checked={stringedInstrument === idx}
                    onChange={() => setStringedInstrument(idx)}
                  />
                  {opt.label}
                </label>
              ))}
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Brass Instrument</td>
            <td>
              {BRASS_OPTIONS.map((opt, idx) => (
                <label key={opt.label} style={{ marginRight: '0.5em' }}>
                  <input
                    type="radio"
                    name="brassInstrument"
                    value={idx}
                    checked={brassInstrument === idx}
                    onChange={() => setBrassInstrument(idx)}
                  />
                  {opt.label}
                </label>
              ))}
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Instrument Mastery</td>
            <td>
              {[0, 1, 2, 3].map(val => (
                <label key={val} style={{ marginRight: '0.5em' }}>
                  <input
                    type="radio"
                    name="instrumentMastery"
                    value={val}
                    checked={instrumentMastery === val}
                    onChange={() => setInstrumentMastery(val)}
                  />
                  {val}
                </label>
              ))}
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Singing Mastery</td>
            <td>
              {[0, 1, 2, 3].map(val => (
                <label key={val} style={{ marginRight: '0.5em' }}>
                  <input
                    type="radio"
                    name="singingMastery"
                    value={val}
                    checked={singingMastery === val}
                    onChange={() => setSingingMastery(val)}
                  />
                  {val}
                </label>
              ))}
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Singing clicky</td>
            <td>
              <label style={{ marginRight: '0.5em' }}>
                <input
                  type="radio"
                  name="singingClicky"
                  value={1}
                  checked={singingClicky === 1}
                  onChange={() => setSingingClicky(1)}
                />
                None
              </label>
              <label style={{ marginRight: '0.5em' }}>
                <input
                  type="radio"
                  name="singingClicky"
                  value={2}
                  checked={singingClicky === 2}
                  onChange={() => setSingingClicky(2)}
                />
                <a href="https://www.pqdi.cc/item/8215" target="_blank" rel="noopener noreferrer">VOTS</a>
              </label>
              <label style={{ marginRight: '0.5em' }}>
                <input
                  type="radio"
                  name="singingClicky"
                  value={3}
                  checked={singingClicky === 3}
                  onChange={() => setSingingClicky(3)}
                />
                <a href="https://www.pqdi.cc/item/26574" target="_blank" rel="noopener noreferrer">Shei cloak</a>
              </label>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '1em', verticalAlign: 'top' }}>Include PoP Songs (Level 61-65)</td>
            <td>
              <input
                type="checkbox"
                checked={includePoP}
                onChange={() => setIncludePoP((v) => !v)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table className="mod-table" style={{ marginBottom: '1em', minWidth: '350px' }}>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map(skill => (
            <tr key={skill.key}>
              <td>{skill.label}</td>
              <td>{getSkillMod(skill.key).toFixed(1)}x</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Select your goals to see recommended song melodies:</p>
      <div className="goals">
        {GOALS.map((goal) => {
          const isActive = selectedGoals.includes(goal.key);
          return (
            <button
              key={goal.key}
              className={`goal-btn${isActive ? ' active' : ''}`}
              onClick={() => handleGoalChange(goal.key)}
              type="button"
            >
              {goal.key === 'attack' && <img src={attackIcon} alt="icon" className="goal-icon" />}
              {goal.key === 'coldResist' && <img src={coldIcon} alt="icon" className="goal-icon" />}
              {goal.key === 'diseaseResist' && <img src={diseaseIcon} alt="icon" className="goal-icon" />}
              {goal.key === 'fireResist' && <img src={fireIcon} alt="icon" className="goal-icon" />}
              {goal.key === 'magicResist' && <img src={magicIcon} alt="icon" className="goal-icon" />}
              {goal.key === 'poisonResist' && <img src={poisonIcon} alt="icon" className="goal-icon" />}
              {goal.key === 'damageShield' && <img src={thornsIcon} alt="icon" className="goal-icon" />}
              {goal.key === 'healthRegen' && <img src={hymnIcon} alt="icon" className="goal-icon" />}
              <span className="goal-label-text">{goal.label}</span>
            </button>
          );
        })}
      </div>
      <div className="results">
        <h2>Melody Song Slots</h2>
        <table className="melody-table">
          <thead>
            <tr>
              <th style={{ width: '1%', textAlign: 'left' }}></th>
              <th style={{ width: '18em', textAlign: 'left' }}>Song</th>
              {INFO_COLUMNS.map(col => (
                <th key={col.key} style={{ textAlign: 'left' }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {melodySongs.map((song, idx) => (
              <tr key={idx} className={stackingConflicts[idx].length > 0 ? 'non-stacking-row' : ''}>
                <td style={{ textAlign: 'left' }}>
                  {song && stackingConflicts[idx].length > 0 && (
                    <button
                      key={idx + '-stack-conflict'}
                      className="stacking-remove-btn stacking-conflict-red"
                      type="button"
                      title={
                        stackingConflicts[idx]
                          .map(conflict => `Slot ${conflict.slot}: ${conflict.effectType}`)
                          .join('\n')
                      }
                      onClick={() => {
                        setRemovedIndices(prev => [...prev, idx]);
                      }}
                    >
                      Stack -
                    </button>
                  )}
                </td>
                <td style={{ textAlign: 'left' }}>
                  {song ? (
                    <>
                      <span style={{ marginRight: '0.3em' }}>{SKILL_ICONS[song.skill] || ''}</span>
                      <span className="song-label-text">{song.name}</span>
                    </>
                  ) : (
                    <span className="song-label-text empty-slot">(empty)</span>
                  )}
                </td>
                {INFO_COLUMNS.map(col => (
                  <td key={col.key} style={{ textAlign: 'left' }}>{song ? getEffectValue(song, col.key, 60) : ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  {/* Overflow songs removed as requested */}
      </div>
    </div>
  );
}

export default App;
