function onSubmit() {
  let currentMora = parseInt(document.getElementById("Mora").value);
  let currentHeroswit = parseInt(document.getElementById("HerosWit").value);
  let currentAdventurers = parseInt(
    document.getElementById("Adventurers").value
  );
  let bossDrops = parseInt(document.getElementById("BossDrops").value);
  let currentLevel = parseInt(
    document.getElementById("charlvl").value.substring(0, 2)
  );
  let currentAscension = parseInt(
    document.getElementById("charlvl").value.substring(3)
  );
  let desiredLevel = parseInt(
    document.getElementById("desiredcharlvl").value.substring(0, 2)
  );
  let desiredAscension = parseInt(
    document.getElementById("desiredcharlvl").value.substring(3)
  );
  let currentGreenBooks = parseInt(
    document.getElementById("green-books").value
  );
  let currentBlueBooks = parseInt(document.getElementById("blue-books").value);
  let currentPurpleBooks = parseInt(
    document.getElementById("purple-books").value
  );
  let currentTalent1 = parseInt(document.getElementById("talent1").value);
  let currentTalent2 = parseInt(document.getElementById("talent2").value);
  let currentTalent3 = parseInt(document.getElementById("talent3").value);
  let desiredTalent1 = parseInt(document.getElementById("talent1final").value);
  let desiredTalent2 = parseInt(document.getElementById("talent2final").value);
  let desiredTalent3 = parseInt(document.getElementById("talent3final").value);

  let moraNeeded = 0;
  let resinNeeded = 0;
  let bossDropsNeeded = 0;
  let greenBooksNeeded = 0;
  let blueBooksNeeded = 0;
  let purpleBooksNeeded = 0;

  let xpNeeded = calculateXPNeeded(
    currentHeroswit,
    currentAdventurers,
    currentLevel,
    desiredLevel
  );

  moraNeeded += calculateMoraForXP(currentLevel, desiredLevel);
  moraNeeded += calculateMoraForAscension(currentAscension, desiredAscension);
  moraNeeded += calculateMoraForTalent(currentTalent1, desiredTalent1);
  moraNeeded += calculateMoraForTalent(currentTalent2, desiredTalent2);
  moraNeeded += calculateMoraForTalent(currentTalent3, desiredTalent3);
  moraNeeded -= currentMora;
    
  bossDropsNeeded = calculateBossDrops(currentAscension, desiredAscension);

  greenBooksNeeded = calcGreenBooks(
    greenBooksNeeded,
    currentTalent1,
    desiredTalent1,
    currentTalent2,
    desiredTalent2,
    currentTalent3,
    desiredTalent3
  );
  blueBooksNeeded = calcBlueBooks(
    blueBooksNeeded,
    currentTalent1,
    desiredTalent1,
    currentTalent2,
    desiredTalent2,
    currentTalent3,
    desiredTalent3
  );
  purpleBooksNeeded = calcPurpleBooks(
    purpleBooksNeeded,
    currentTalent1,
    desiredTalent1,
    currentTalent2,
    desiredTalent2,
    currentTalent3,
    desiredTalent3
  );
  changeNeededTalentsText(greenBooksNeeded, blueBooksNeeded, purpleBooksNeeded);
  changeMoraNeededText(moraNeeded);
  changeBossMatsNeededText(bossDrops, bossDropsNeeded);
  changeXpBooksNeededText(xpNeeded);

  resinNeeded += resinXP(xpNeeded);
  resinNeeded += resinMora(moraNeeded);
  resinNeeded += resinBossDrops(bossDrops, bossDropsNeeded);
  resinNeeded += resinForBooks(greenBooksNeeded, blueBooksNeeded, purpleBooksNeeded);
  
  if (resinNeeded % 20 > 0) {
    resinNeeded += 20;
  }
  resinNeeded -= resinNeeded % 20;

  document.getElementById("resultContainer").innerText =
    "Resin ~=" + resinNeeded;

checkValidation(currentLevel, desiredLevel, currentTalent1, currentTalent2, currentTalent3, desiredTalent1, desiredTalent2, desiredTalent3);    


  return false;
}

function changeXpBooksNeededText(xpNeeded){
  let xpNeed = parseInt(xpNeeded/4);
  let thing = xpNeed.toLocaleString('en-US')
  document.getElementById('need-xp').innerText = 'You need ' + thing + ' Hero\'s Wit.'
}

function changeNeededTalentsText(greenBooksNeeded, blueBooksNeeded, purpleBooksNeeded){
  document.getElementById('need-talent-green').innerText = 'You need '+ greenBooksNeeded + ' green books.';
  document.getElementById('need-talent-blue').innerText = 'You need '+ blueBooksNeeded + ' blue books.';
  document.getElementById('need-talent-purple').innerText = 'You need '+ purpleBooksNeeded + ' purple books.';
}

function changeBossMatsNeededText(bossDrops, bossDropsNeeded){
  if (bossDropsNeeded-bossDrops>0)
  document.getElementById('need-boss').innerText = 'You need ' + (bossDropsNeeded-bossDrops) + ' boss drops.'
}

/**
 * Takes current materials, current level, and desired level to calculate
 * how much xp is required to level the character. Different xp is required
 * for different levels.
 * @param {Number} currentHeroswit
 * @param {Number} currentAdventurers
 * @param {Number} currentLevel
 * @param {Number} desiredcharlvl
 * @returns
 */
function calculateXPNeeded(
  currentHeroswit,
  currentAdventurers,
  currentLevel,
  desiredcharlvl
) {
  let xpNeeded = 0;

  if (desiredcharlvl < currentLevel) {
    return 0;
  }
  if (desiredcharlvl == 90 && currentLevel <= 80) {
    xpNeeded += 822;
  }
  if (desiredcharlvl >= 80 && currentLevel <= 70) {
    xpNeeded += 439;
  }
  if (desiredcharlvl >= 70 && currentLevel <= 60) {
    xpNeeded += 240;
  }
  if (desiredcharlvl >= 60 && currentLevel <= 50) {
    xpNeeded += 171;
  }
  if (desiredcharlvl >= 50 && currentLevel <= 40) {
    xpNeeded += 116;
  }
  if (desiredcharlvl >= 40 && currentLevel <= 40) {
    xpNeeded += 116;
  }
  if (desiredcharlvl >= 20 && currentLevel <= 20) {
    xpNeeded += 25;
  }

  let currentXp = currentHeroswit * 4 + currentAdventurers;
  xpNeeded -= currentXp;

  if (xpNeeded > 0) {
    return xpNeeded;
  }
  return 0;
}

function checkValidation(
  currentLevel,
  desiredLevel,
  currentTalent1,
  currentTalent2,
  currentTalent3,
  desiredTalent1,
  desiredTalent2,
  desiredTalent3
) {
  if (currentLevel > desiredLevel) {
    document.getElementById("resultContainer").innerText =
      "current character level must be equal to or below desired level";
  }
  if (
    currentTalent1 > desiredTalent1 ||
    currentTalent2 > desiredTalent2 ||
    currentTalent3 > desiredTalent3
  ) {
    document.getElementById("resultContainer").innerText =
      "current talent level must be equal to or below desired level";
  }
}

function changeMoraNeededText(moraNeeded){
  let thing = moraNeeded.toLocaleString('en-US')
  if(moraNeeded>0)
  document.getElementById('need-mora').innerText = 'You need ' + thing + ' mora.'
}

/**
 *Every xp book used to level up a character takes 5000 mora.
 * @param {Number} xpNeeded
 * @returns
 */
function calculateMoraForXP(currentLevel, desiredLevel) {
  let xpNeeded = 0;
  if (desiredcharlvl < currentLevel) {
    return 0;
  }
  if (desiredLevel == 90 && currentLevel <= 80) {
    xpNeeded += 822;
  }
  if (desiredLevel >= 80 && currentLevel <= 70) {
    xpNeeded += 439;
  }
  if (desiredLevel >= 70 && currentLevel <= 60) {
    xpNeeded += 240;
  }
  if (desiredLevel >= 60 && currentLevel <= 50) {
    xpNeeded += 171;
  }
  if (desiredLevel >= 50 && currentLevel <= 40) {
    xpNeeded += 116;
  }
  if (desiredLevel >= 40 && currentLevel <= 40) {
    xpNeeded += 116;
  }
  if (desiredLevel >= 20 && currentLevel <= 20) {
    xpNeeded += 25;
  }
  return xpNeeded*1000;
}
/**
 * Takes current ascension and current level to calculate how much mora is required for the ascensions desired
 * @param {Number} currentAscension
 * @param {Number} desiredAscension
 * @returns
 */
function calculateMoraForAscension(currentAscension, desiredAscension) {
  let total = 0;
  if (currentAscension == 90) {
    return 0;
  }
  if (desiredAscension == 90) {
    total += 120000;
  }
  if (desiredAscension >= 80 && currentAscension < 80) {
    total += 100000;
  }
  if (desiredAscension >= 70 && currentAscension < 70) {
    total += 80000;
  }
  if (desiredAscension >= 60 && currentAscension < 60) {
    total += 60000;
  }
  if (desiredAscension >= 50 && currentAscension < 50) {
    total += 40000;
  }
  if (desiredAscension >= 40 && currentAscension < 40) {
    total += 20000;
  }
  return total;
}

function calculateMoraForTalent(currentTalent, desiredTalent) {
  let total = 0;
  if (desiredTalent == 10 && currentTalent < 10) {
    total += 700000;
  }
  if (desiredTalent >= 9 && currentTalent < 9) {
    total += 450000;
  }
  if (desiredTalent >= 8 && currentTalent < 8) {
    total += 260000;
  }
  if (desiredTalent >= 7 && currentTalent < 7) {
    total += 120000;
  }
  if (desiredTalent >= 6 && currentTalent < 6) {
    total += 37500;
  }
  if (desiredTalent >= 5 && currentTalent < 5) {
    total += 30000;
  }
  if (desiredTalent >= 4 && currentTalent < 4) {
    total += 25000;
  }
  if (desiredTalent >= 3 && currentTalent < 3) {
    total += 17500;
  }
  if (desiredTalent >= 2 && currentTalent < 2) {
    total += 12500;
  }
  return total;
}

function calculateBossDrops(currentAscension, desiredAscension) {
  let total = 0;
  if (currentAscension == 90) {
    return 0;
  }
  if (desiredAscension == 90) {
    total += 20;
  }
  if (desiredAscension >= 80 && currentAscension < 80) {
    total += 12;
  }
  if (desiredAscension >= 70 && currentAscension < 70) {
    total += 8;
  }
  if (desiredAscension >= 60 && currentAscension < 60) {
    total += 4;
  }
  if (desiredAscension >= 50 && currentAscension < 50) {
    total += 2;
  }
  return total;
}

function resinMora(moraNeeded) {
  if (moraNeeded > 0) {
    return (moraNeeded / 60000) * 20;
  }
  return 0;
}



/**
 * Converts XP required to the amount of resin needed.
 * Uses the average amount of XP given in one ley-line.
 * Due to the randomness of RNG, this is an approximation
 * @param {Number} xpNeeded
 * @returns {Number}
 */
function resinXP(xpNeeded) {
  return (xpNeeded / 24) * 20;
}

function resinBossDrops(bossDrops, bossDropsNeeded) {
  let needed = bossDropsNeeded - bossDrops;
  if (needed > 0) {
    return (needed / 2.5) * 40;
  }
  return 0;
}

function onReset() {
  document.getElementById("resultContainer").innerText = "Resin:";
}

function greenBooks(currentTalent, desiredTalent) {
  let total = 0;
  if (desiredTalent >= 2 && currentTalent < 2) {
    total += 3;
  }
  return total;
}

function blueBooks(currentTalent, desiredTalent) {
  let total = 0;
  if (desiredTalent >= 6 && currentTalent < 6) {
    total += 9;
  }
  if (desiredTalent >= 5 && currentTalent < 5) {
    total += 6;
  }
  if (desiredTalent >= 4 && currentTalent < 4) {
    total += 4;
  }
  if (desiredTalent >= 3 && currentTalent < 3) {
    total += 2;
  }
  return total;
}

function purpleBooks(currentTalent, desiredTalent) {
  let total = 0;
  if (desiredTalent == 10 && currentTalent < 10) {
    total += 16;
  }
  if (desiredTalent >= 9 && currentTalent < 9) {
    total += 12;
  }
  if (desiredTalent >= 8 && currentTalent < 8) {
    total += 6;
  }
  if (desiredTalent >= 7 && currentTalent < 7) {
    total += 4;
  }

  return total;
}

function calcPurpleBooks(
  purpleBooksNeeded,
  currentTalent1,
  desiredTalent1,
  currentTalent2,
  desiredTalent2,
  currentTalent3,
  desiredTalent3
) {
  purpleBooksNeeded += purpleBooks(currentTalent1, desiredTalent1);
  purpleBooksNeeded += purpleBooks(currentTalent2, desiredTalent2);
  purpleBooksNeeded += purpleBooks(currentTalent3, desiredTalent3);
  return purpleBooksNeeded;
}

function calcBlueBooks(
  blueBooksNeeded,
  currentTalent1,
  desiredTalent1,
  currentTalent2,
  desiredTalent2,
  currentTalent3,
  desiredTalent3
) {
  blueBooksNeeded += blueBooks(currentTalent1, desiredTalent1);
  blueBooksNeeded += blueBooks(currentTalent2, desiredTalent2);
  blueBooksNeeded += blueBooks(currentTalent3, desiredTalent3);
  return blueBooksNeeded;
}

function calcGreenBooks(
  greenBooksNeeded,
  currentTalent1,
  desiredTalent1,
  currentTalent2,
  desiredTalent2,
  currentTalent3,
  desiredTalent3
) {
  greenBooksNeeded += greenBooks(currentTalent1, desiredTalent1);
  greenBooksNeeded += greenBooks(currentTalent2, desiredTalent2);
  greenBooksNeeded += greenBooks(currentTalent3, desiredTalent3);
  return greenBooksNeeded;
}

function resinForBooks(greenBooksNeeded, blueBooksNeeded, purpleBooksNeeded) {
  let total = 0;
  total+= (greenBooksNeeded/4)*40;
  total+= ((blueBooksNeeded/16)*3)*40;
  total+= ((purpleBooksNeeded/16)*9)*40;
  return total;
}
