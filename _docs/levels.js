function init() {
  pmBase.content.build({
    pages: [{
      content: show,
    }]
  });
}

function intersect(l1_p1_x, l1_p1_y, l1_p2_x, l1_p2_y, l2_p1_x, l2_p1_y, l2_p2_x, l2_p2_y) {
  let s1_x = l1_p2_x - l1_p1_x;
  let s1_y = l1_p2_y - l1_p1_y;
  let s2_x = l2_p2_x - l2_p1_x;
  let s2_y = l2_p2_y - l2_p1_y;
  let s = (-s1_y * (l1_p1_x - l2_p1_x) + s1_x * (l1_p1_y - l2_p1_y)) / (-s2_x * s1_y + s1_x * s2_y);
  let t = (s2_x * (l1_p1_y - l2_p1_y) - s2_y * (l1_p1_x - l2_p1_x)) / (-s2_x * s1_y + s1_x * s2_y);
  return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}

function extractEnemyData(source, target) {
  for (let key in target) {
    if (target[key] && target[key].m_defined) source[key] = target[key].m_value;
  }
  for (let key in target.attributes) {
    if (target.attributes[key] && target.attributes[key].m_defined) source[key] = target.attributes[key].m_value;
  }
  if ( target.talentBlackboard ) source.talentBlackboard = target.talentBlackboard;
}


function getAttr(frames, level, attr) {
  return Math.round( ( level - 1 ) / ( frames[1].level - frames[0].level) * (frames[1].data[attr] - frames[0].data[attr]) + frames[0].data[attr] );
}

function createMap(map, tiles, texts, rates, size, r, g, b) {
  let html = '<table class="p-map"><tbody>';
  map.forEach(row => {
    html += '<tr>';
    row.forEach(tileIndex => {
      let tileData = tiles[tileIndex];
      let type = tileData.tileKey.slice(5);
      let text = texts ? texts[tileIndex] : '';
      if (!!rates) text = `<div style="width:${size};height:${size};line-height:${size};background-color: rgba(${r},${g},${b},${rates[tileIndex]});color:rgb(${r>>2},${g>>2},${b>>2});">${text}</div>`;
      html += `<td class="p-map__tile p-map__tile--${type} p-map__tile--height-${tileData.heightType} p-map__tile--buildable-${tileData.buildableType}">${text}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

function show(hash) {
  if (hash.isEmpty) return;
  let levelId = hash.value;
  AKDATA.load([
    `excel/item_table.json`,
    `excel/building_data.json`,
    `excel/stage_table.json`,
    `excel/character_table.json`,
    `levels/enemydata/enemy_database.json`,
    `levels/${levelId}.json`,
  ], showCallback, levelId);
}

function showCallback(levelId) {
  let html = '';
  let levelData = AKDATA.Data[levelId.split('/').pop()];
  let stageData = Object.values(AKDATA.Data.stage_table.stages).find(x => x.levelId == levelId);
  let hardStageData;
  if (stageData.hardStagedId) hardStageData = AKDATA.Data.stage_table.stages[stageData.hardStagedId];
  //console.log("hard", hardStageData);
  let hasHard = !!hardStageData;
  console.log(levelData);
  console.log(stageData);
  console.log(hardStageData);

  let mapWidth = levelData.mapData.width;
  let mapHeight = levelData.mapData.height;
  function getTileName(col,row = -1) {
    let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if ( row === -1 ) {
      row = Math.floor(col/mapWidth);
      col = col % mapWidth;
    }
    return `${alphabets[col]}${mapHeight-row}`;
  }

  // Token
  let tokenHtml = '';
  if (levelData.predefines && levelData.predefines.tokenInsts && levelData.predefines.tokenInsts.length > 0){
    tokenHtml += pmBase.component.create({
      type:'list',
      header: ['??????', '??????', '??????', '????????????', '?????????'],
      list: levelData.predefines.tokenInsts.map( tokenData => {
        let charData = AKDATA.Data.character_table[tokenData.inst.characterKey];
        let atk = getAttr(charData.phases[tokenData.inst.phase].attributesKeyFrames, tokenData.inst.level, 'atk');
        let direction = ['???','???','???','???'][tokenData.direction];
        return [
          `<a href="../character/#!/${tokenData.inst.characterKey}">${charData.name}</a>`,
          getTileName(tokenData.position.col,tokenData.position.row),
          direction,
          tokenData.hidden ? '??????' : '??????',
          atk,
          //tokenData.skillIndex,
          //tokenData.inst.level,
        ];
      }),
      card: true,
      title: '??????',
    });
  }

  // Enemy
  let finalEnemyData = {};
  levelData.enemyDbRefs.forEach(item => {
    let data = {
      count: 0,
    };
    if ( item.useDb ) {
      let query = AKDATA.Data.enemy_database.enemies
        .find(x => x.Key == item.id)
        .Value;
      extractEnemyData(data, query[0].enemyData);
      if (item.level > 0) extractEnemyData(data, query[item.level].enemyData);
    }
    if (!!item.overwrittenData) extractEnemyData(data, item.overwrittenData);

    finalEnemyData[item.id] = data;
  });

  // Map
  let mapReindex = new Array(mapWidth * mapHeight).fill("");
  let startIndex = 0,
    endIndex = 0;
  let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  levelData.mapData.tiles.forEach((tile, index) => {
    /*
    if (tile.tileKey == 'tile_start' || tile.tileKey == 'tile_flystart') mapReindex[index] = alphabets[startIndex++];
    else if (tile.tileKey == 'tile_end') mapReindex[index] = alphabets[alphabets.length - 1 - (endIndex++)];
*/
    mapReindex[index] = getTileName(index);
  });
  if (levelData.predefines && levelData.predefines.tokenInsts && levelData.predefines.tokenInsts.length > 0){
    levelData.predefines.tokenInsts.map( tokenData => {
      let index = tokenData.position.row * levelData.mapData.width + tokenData.position.col;
      let direction = ['up','right','down','left'][tokenData.direction];
      mapReindex[index] = `<i class="fas fa-arrow-circle-${direction}" style="color: red;"></i>`;
    });
  }

  console.log(finalEnemyData);

  let mapTable = createMap(levelData.mapData.map, levelData.mapData.tiles, mapReindex);

  // Routes
  let c = 0;
  let routeList = levelData.routes.map(data => {
    if (!data) return null;
    let checkpoints = [];
    let path = '';
    let arrow = '>';//'<i class="fa fa-chevron-right"></i>';
    checkpoints.push([data.startPosition.col, data.startPosition.row, data.startPosition.col + 0.5, data.startPosition.row + 0.5]);
    data.checkpoints.forEach(x => {
      if (x.type == 0) {
        checkpoints.push([x.position.col, x.position.row, x.position.col + 0.5 + x.reachOffset.x, x.position.row + 0.5 + x.reachOffset.y]);
        path += arrow + getTileName(x.position.col, x.position.row);
      } else if (x.type ==1 ){
        path += `<small>(${x.time}s)</small>`;
      } else if (x.type ==3 ){
        path += `<small>(${x.time}s)</small>`;
      } else if (x.type ==5 ){
        path += arrow + `??????`;
      } else if (x.type ==6 ){
        path += arrow + `??????<small>(` + getTileName(x.position.col, x.position.row) + ')</small>';
      } else{
        path += `${getTileName(x.position.col, x.position.row)}[${x.type}]`;
      }
    });
    if (path) path+=arrow;
    checkpoints.push([data.endPosition.col, data.endPosition.row, data.endPosition.col + 0.5, data.endPosition.row + 0.5]);

    let tiles = [];
    for (let i = 0; i < checkpoints.length - 1; i++) {
      let subTiles = [];
      let [c0, r0, x0, y0] = checkpoints[i];
      let [c1, r1, x1, y1] = checkpoints[i + 1];

      if (c0 > c1)[c0, c1] = [c1, c0];
      if (r0 > r1)[r0, r1] = [r1, r0];

      let checker = [];
      for (let x = c0; x < c1; x++)
        for (let y = r0; y <= r1; y++) {
          checker.push([x + 1, y, x + 1, y + 1, x, y, x + 1, y]);
        }
      for (let x = c0; x <= c1; x++)
        for (let y = r0; y < r1; y++) {
          checker.push([x, y + 1, x + 1, y + 1, x, y, x, y + 1]);
        }

      for (let line of checker) {
        if (intersect(x0, y0, x1, y1, line[0], line[1], line[2], line[3])) {
          subTiles.push(line[4] + line[5] * mapWidth);
          subTiles.push(line[6] + line[7] * mapWidth);
        }
      }

      if (data.motionMode == 0) {
        let wrong = subTiles.some(x => levelData.mapData.tiles[x].passableMask !== 3);
        //if (wrong) console.log(`begin: ${checkpoints[i]}, end:${checkpoints[i + 1]}, tiles:${subTiles}`);
      }

      tiles.push(...subTiles);
    }
    tiles = [...new Set(tiles)];
    return {
      start: data.startPosition.col + data.startPosition.row * mapWidth,
      end: data.endPosition.col + data.endPosition.row * mapWidth,
      path: path,
      tiles
    };
  });
  if (c) alert(c);

  // Enemy
  let htmlWave = '';
  let enemyIndex = 0;
  let enemyIndexBegin = 0;
  let totalDelay = 0;
  let totalEnemyCount = 0;
  let totalEnemyHP = 0;
  let totalEnemyAtk = 0;
  let totalEnemyDef = 0;
  let totalEnemyMr = 0;

  let atkHeatmap = new Array(levelData.mapData.tiles.length).fill(0);
  let hpHeatmap = new Array(levelData.mapData.tiles.length).fill(0);
  let numberHeatmap = new Array(levelData.mapData.tiles.length).fill(0);
  let timeHeatmap = new Array(levelData.mapData.tiles.length).fill(0);
  let defHeatmap = new Array(levelData.mapData.tiles.length).fill(0);
  let mrHeatmap = new Array(levelData.mapData.tiles.length).fill(0);

  levelData.waves.forEach((waveData, waveIndex) => {
    let waveDelay = 0;
    let htmlBody = '';
    enemyIndexBegin = enemyIndex + 1;
    waveData.fragments.forEach((fragmentData, fragmentIndex) => {
      let lastDelay = 0;
      let extendActions = [];
      fragmentData.actions.forEach((actionData, actionIndex) => {
        if (actionData.actionType != 0) return true;
        totalEnemyCount += actionData.count;
        for (let i = 0; i < actionData.count; i++) {
          let preDelay = waveDelay + fragmentData.preDelay + actionData.preDelay + actionData.interval * i;
          // actionData.blockFragment !! care
          let action = {
            key: actionData.key,
            routeIndex: actionData.routeIndex,
            preDelay: preDelay,
          };
          extendActions.push(action);
          lastDelay = Math.max(lastDelay, preDelay);
        }
      });
      extendActions.sort((a, b) => a.preDelay - b.preDelay);
      waveDelay = lastDelay;

      htmlBody += '<thead><tr><th>??????</th><th style="width:20%;">??????</th><th>??????</th><th>??????</th><th style="width:30%;">??????</th><th>??????</th><th>HP</th><th>??????</th><th>??????</th><th>??????</th></tr></thead>';
      htmlBody += '<tbody>';
      extendActions.forEach((actionData, j) => {
        let number = ++enemyIndex;
        let enemyData = finalEnemyData[actionData.key];
        if (!enemyData) return true;
        totalEnemyHP += enemyData.maxHp;
        totalEnemyAtk += enemyData.atk;
        totalEnemyDef += enemyData.def;
        totalEnemyMr += enemyData.magicResistance;
        let routeData = routeList[actionData.routeIndex];
        routeData.tiles.forEach(i => {
          hpHeatmap[i] += enemyData.maxHp;
          atkHeatmap[i] += enemyData.atk;
          defHeatmap[i] += enemyData.def;
          mrHeatmap[i] += enemyData.magicResistance;
          numberHeatmap[i]++;
          timeHeatmap[i] += actionData.preDelay;
        });
        enemyData.count++;
        htmlBody += `<tr>
        <td>${number}</td>
        <td>${enemyData.name}</td>
        <td>${Math.round(actionData.preDelay*100)/100}</td>
        <td>${mapReindex[routeData.start] || routeData.start}</td>
        <td>${routeData.path}</td>
        <td>${mapReindex[routeData.end] || routeData.end}</td>
        <td>${enemyData.maxHp}</td>
        <td>${enemyData.atk}</td>
        <td>${enemyData.def}</td>
        <td>${enemyData.magicResistance}%</td>
        </tr>`;
      });
      htmlBody += '</tbody>';
    });
    totalDelay += waveDelay;
    if (enemyIndex < enemyIndexBegin) return true;
    htmlWave += `
    <div class="card">
    <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapse${waveIndex}">
      ??????${waveIndex+1}???${waveData.name || enemyIndexBegin + '-' + enemyIndex}
    </div>
    <div id="collapse${waveIndex}" class="collapse ${levelData.waves.length == 1?'show':''}">
      <table class="table table-sm card-body p-0 m-0 text-center table-hover">
        ${htmlBody}
      </table>
    </div>
    </div>
    `;
  });

  let hpHeatmapRates = hpHeatmap.map(x => (x / totalEnemyHP).toFixed(2));
  let hpHeatmapText = hpHeatmapRates.map(x => x > 0 ? (x * 100).toFixed(0) + '%' : '');
  let hpHeatmapTable = createMap(levelData.mapData.map, levelData.mapData.tiles, hpHeatmapText, hpHeatmapRates, '32px', 0, 255, 0);

  let countHeatmapRates = numberHeatmap.map(x => (x / totalEnemyCount).toFixed(2));
  let countHeatmapText = numberHeatmap.map(x => x > 0 ? x : '');
  let countHeatmapTable = createMap(levelData.mapData.map, levelData.mapData.tiles, countHeatmapText, countHeatmapRates, '32px', 0, 0, 255);

  let atkHeatmapRates = atkHeatmap.map(x => (x / totalEnemyAtk).toFixed(2));
  let atkHeatmapText = atkHeatmapRates.map(x => x > 0 ? (x * 100).toFixed(0) + '%' : '');
  let atkHeatmapTable = createMap(levelData.mapData.map, levelData.mapData.tiles, atkHeatmapText, atkHeatmapRates, '32px', 255, 0, 0);
/*
  let timeHeatmapRates = timeHeatmap.map((x,i) => (x / totalDelay / numberHeatmap[i]).toFixed(2));
  let timeHeatmapText = timeHeatmapRates.map(x => x > 0 ? Math.ceil(x * 100) + '%' : '');
  let timeHeatmapTable = createMap(levelData.mapData.map, levelData.mapData.tiles, timeHeatmapText, timeHeatmapRates, '32px', 255, 255, 0);
*/
  let defHeatmapRates = defHeatmap.map(x => (x / totalEnemyDef).toFixed(2));
  let defHeatmapText = defHeatmapRates.map(x => x > 0 ? (x * 100).toFixed(0) + '%' : '');
  let defHeatmapTable = createMap(levelData.mapData.map, levelData.mapData.tiles, defHeatmapText, defHeatmapRates, '32px', 128, 0, 0);

  let mrHeatmapRates = mrHeatmap.map(x => (x / totalEnemyMr).toFixed(2));
  let mrHeatmapText = mrHeatmapRates.map(x => x > 0 ? (x * 100).toFixed(0) + '%' : '');
  let mrHeatmapTable = createMap(levelData.mapData.map, levelData.mapData.tiles, mrHeatmapText, mrHeatmapRates, '32px', 255, 0, 255);

  let enemyHtml = pmBase.component.create({
    type:'list',
    columns: ['??????', '??????', {header:'??????',width:'35%'}, '<small>??????', '<small>?????????', '<small>?????????', '<small>????????????', '<small>????????????', '<small>??????', '<small>????????????', '<small>????????????', '<small>??????'],
    list: Object.values(finalEnemyData).map( enemyData => [
      enemyData.name,
      enemyData.count,
      AKDATA.formatString(enemyData.description,true) + (enemyData.talentBlackboard ? '<ul class="small text-left m-0">' + enemyData.talentBlackboard.map(x=>`<li>${x.key} = ${x.value}</li>`).join('') + '</ul>' :''),
      enemyData.maxHp,
      enemyData.atk,
      enemyData.def,
      enemyData.magicResistance + '%',
      (enemyData.moveSpeed * 100).toFixed(0) + '%',
      enemyData.rangeRadius ? enemyData.rangeRadius : '-',
      enemyData.baseAttackTime + 's',
      enemyData.hpRecoveryPerSec ? enemyData.hpRecoveryPerSec + '/s' : '-',
      enemyData.massLevel,
    ]),
    card: true,
    title: '????????????',
  });
  enemyHtml += tokenHtml;

  let htmlDrop;
  
  if (!!stageData.stageDropInfo.displayDetailRewards) {
    let dropTypes = ['', '????????????', '????????????', '????????????', '????????????', '', '', '????????????'];
    let dropList = {
      type: 'list',
      header: ['??????', '????????????', '????????????'],
      list: stageData.stageDropInfo.displayDetailRewards.map(x => {
        let it = x.id;
        try { it = AKDATA.getItem(x.type, x.id); } catch { }
        return [ it, dropTypes[x.dropType], x.occPercent ];
      }),
      card:true,
    };
    htmlDrop = pmBase.component.create(dropList);
  }

  let infoTable = [
    ['????????????', levelData.options.characterLimit],
    ['??????????????????', levelData.options.initialCost],
    ['??????????????????', levelData.options.costIncreaseTime == 999999 ? '0' : `${levelData.options.costIncreaseTime}???/1???`],
    ['??????????????????', levelData.options.maxCost],
    ['?????????', levelData.options.maxLifePoint],
    ['????????????', totalEnemyCount],
    ['??????????????????', Math.floor(totalDelay / 60) + ':' + Math.ceil(totalDelay % 60).toString().padStart(2, '0')],
  ];

  let title = stageData.name;
  if (stageData.code) title = stageData.code + ' ' + title;
  let hardAttrLabel = {
    'atk': '?????????',
    'def': '?????????',
    'max_hp': 'HP',
    'attack_speed': '????????????',
    'move_speed': '????????????',
  };

  let tileAttr = '', hardAttr = '';
  //console.log(levelData.runes);
  if (hasHard) {
    if ("ebuff_attribute" in levelData.runes) {
        hardAttr += levelData.runes
        .find(x => x.key === 'ebuff_attribute')
        .blackboard
        .filter(x=>x.value!==1)
        .map(x=>`<li>${hardAttrLabel[x.key]||x.key}: ${(x.value*100).toFixed()}%</li>`)
        .join('');
    }
    if ("enemy_attribute_mul" in levelData.runes) {
      hardAttr += levelData.runes
      .find(x => x.key === 'enemy_attribute_mul')
      .blackboard
      .filter(x=>x.value!==1)
      .map(x=>`<li>${hardAttrLabel[x.key]||x.key}: * ${(x.value*100).toFixed()}%</li>`)
      .join('');

    }
    if ("ebuff_talent_blackb_mul" in levelData.runes) {
      hardAttr += levelData.runes.filter(x => x.key === 'ebuff_talent_blackb_mul')
        .map(x=>`<li>${finalEnemyData[x.blackboard[0].valueStr].name}: ${x.blackboard[1].key}: ${x.blackboard[1].value}</li>`)
        .join('');
    }
    hardAttr += levelData.runes.filter(x => x.key === 'ebuff_attribute' && x.blackboard[0].key === 'enemy' )
      .flatMap(x=> x.blackboard.filter(x=>x.key!=='enemy').map(y=>`<li>${finalEnemyData[x.blackboard[0].valueStr].name}: ${hardAttrLabel[y.key]||y.key}: ${(y.value*100).toFixed()}%</li>`))
      .join('');
    hardStageData.isHard = true;
  }

  tileAttr += levelData.mapData.tiles
    .filter(x=>x.blackboard)
    .flatMap(x=>x.blackboard)
    .map(x=>`<li>${x.key}: ${x.value}</li>`)
    .distinct()
    .join('')
    ;

  let stageTableHelper = [
    ['??????', x => x.code],
    ['??????', x => x.name],
    ['??????', x => x.dangerLevel],
    ['??????', x => AKDATA.formatString(x.description, true) + (x.isHard ? `<ul class="mb-0 pb-0 small">${hardAttr}</ul>` : `<ul class="mb-0 pb-0 small">${tileAttr}</ul>` )],
    ['????????????', x => x.apCost + ( x.apCost ? `<small>???????????????${x.apFailReturn}???</small>` : '' )],
    ['??????', x => x.canPractice ? '???????????' + x.practiceTicketCost : '??????'],

    ['?????????', x => x.isHard ? Math.round(x.expGain * 1.2*100)/100 : `${x.expGain}<small>????????????</small> / ${Math.round(x.expGain * 1.2*100)/100}<small>????????????</small>`],
    ['??????', x => x.isHard ? Math.round(x.goldGain * 1.2*100)/100 : `${x.goldGain}<small>????????????</small> / ${Math.round(x.goldGain * 1.2*100)/100}<small>????????????</small>`],
    ['??????', x => x.isHard ? x.completeFavor : `${x.passFavor}<small>????????????</small> / ${x.completeFavor}<small>????????????</small>`],
  ];

  let stageInfo = {
    header: [ '', '??????', '??????' ],
    card: true,
    list: stageTableHelper.map(x => [
      x[0],
      x[1](stageData),
      hasHard ? x[1](hardStageData) : '',
    ]),
  };

  /*
    appearanceStyle: 0
    bossMark: true
    canBattleReplay: true
    dailyStageDifficulty: -1
    dangerPoint: -1
    diamondOnceDrop: 1
    difficulty: "NORMAL"
    displayMainItem: "30063"
    loseExpGain: 0
    loseGoldGain: 0
    passFavor: 20
    slProgress: 78
    stageId: "main_04-10"
    stageType: "MAIN"
    unlockCondition: [{???}]

  */


  let tabs = pmBase.component.create({
    type: 'tabs',
    tabs: [{
      text: '????????????',
      content: pmBase.component.create('info', stageInfo),
    }, {
      text: '????????????',
      content: htmlDrop,
    }, {
      text: '??????',
      content: enemyHtml,
    }, {
      text: '?????????',
      content: htmlWave,
    }, {
      text: '?????? <small>(dev)</small>',
      content: `<div class="row">
      <div class="col-12 col-lg-6"><div class="card mb-3"><div class="card-header">????????????</div><div class="card-body">${countHeatmapTable}</div></div></div>
        <div class="col-12 col-lg-6"><div class="card mb-3"><div class="card-header">???HP???</div><div class="card-body">${hpHeatmapTable}</div></div></div>
        <div class="col-12 col-lg-6"><div class="card mb-3"><div class="card-header">???????????????</div><div class="card-body">${atkHeatmapTable}</div></div></div>
        <div class="col-12 col-lg-6"><div class="card mb-3"><div class="card-header">???????????????</div><div class="card-body">${defHeatmapTable}</div></div></div>
        <div class="col-12 col-lg-6"><div class="card mb-3"><div class="card-header">??????????????????</div><div class="card-body">${mrHeatmapTable}</div></div></div>
      </div>`,
    }]
  });

  html += `
  <div class="row">
    <div class="col-12 col-lg-7">${pmBase.component.create({ type: 'info', list: infoTable, card: true})}</div>
    <div class="col-12 col-lg-5">${mapTable}</div>
  </div>
  ${tabs}
  `;

  return {
    content: html,
    title
  };
}

pmBase.hook.on('init', init);