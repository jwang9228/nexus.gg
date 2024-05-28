import { useState } from 'react';
import { GiTripleScratches, GiPentarrowsTornado, GiHydra, GiSeaDragon, GiEyestalk, GiDrippingHoney, GiTowerFall } from 'react-icons/gi';
import { HiChevronDoubleUp } from 'react-icons/hi';
import { PiDiamondsFour } from 'react-icons/pi';
import gameModes from '../../../metadata/gamemodes.json';
import summonerSpells from '../../../metadata/summoners.json';
import runes from '../../../metadata/runes.json';
import AdvancedMatch from './AdvancedMatch';

function Match({ matchData, summonerName, region }) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const metadata = matchData.metadata;
	const matchInfo = matchData.info;

  if (!gameModes.find(gameMode => gameMode.queueId === matchInfo.queueId)) return;

  const [showFullDetails, setShowFullDetails] = useState(false);

  const timeToStr = (time, timeUnit) => { 
    return time !== 0 ? `${time}${timeUnit}` : '';
  };
  const timeToStrCompact = (time, timeUnit) => {
    if (time === 0) {
      if (timeUnit === 'h') return '';
      else if (timeUnit === 'm') return '00:';
      else return '00';
    } 
    const timePadded = time < 10 ? `0${time}` : time;
    const addColon = timeUnit !== 's';
    return addColon ? `${timePadded}:` : `${timePadded}`;
  };
	const getMatchTime = (isCompact) => {
    const gameDurationSeconds = matchInfo.gameDuration;
		const hours = Math.floor(gameDurationSeconds / 3600);
		const minutes = Math.floor((gameDurationSeconds % 3600) / 60);
		const seconds = gameDurationSeconds % 60;

    if (isCompact) {
      return `${timeToStrCompact(hours, 'h')}${timeToStrCompact(minutes, 'm')}${timeToStrCompact(seconds, 's')}`;
    } else {
      return `${timeToStr(hours, 'h')} ${timeToStr(minutes, 'm')} ${timeToStr(seconds, 's')}`;
    }
	};

	const playersData = matchInfo.participants;
	const teamData = {};
	let myPlayer = undefined;

  const getMatchResult = (player) => {
		if (player.gameEndedInEarlySurrender) {
			return 'Remake';
		} else {
			return player.win ? 'Victory' : 'Defeat';
		}
	};

  const calculateMatchLastPlayed = () => {
    const timePlayedMs = myPlayer.timePlayed * 1000;
		const gameStartTime = matchInfo.gameStartTimestamp;
		const gameEndTime = gameStartTime + timePlayedMs;
		const currentTime = Date.now();
		const timeElapsed = currentTime - gameEndTime;
		const timeElapsedSeconds = Math.floor(timeElapsed / 1000);

		const secondsPerHour = 60 * 60;
		const secondsPerDay = secondsPerHour * 24;
		const secondsPerMonth = secondsPerDay * 31;
		
		let matchLastPlayed = undefined;
		// less than a minute ago
		if (timeElapsedSeconds < 60) {
			matchLastPlayed = timeElapsedSeconds + " seconds ago";
		} else if (timeElapsedSeconds < secondsPerHour) {
			const timeElapsedMinutes = Math.floor(timeElapsedSeconds / 60);
			matchLastPlayed = (timeElapsedMinutes > 1) ? timeElapsedMinutes + " mins ago" : "a minute ago";
		} else if (timeElapsedSeconds < secondsPerDay) {
			const timeElapsedHours = Math.floor(timeElapsedSeconds / secondsPerHour);
			matchLastPlayed = (timeElapsedHours > 1) ? timeElapsedHours + " hours ago" : "an hour ago";
		} else if (timeElapsedSeconds < secondsPerMonth) {
			const timeElapsedDays = Math.floor(timeElapsedSeconds / secondsPerDay);
			matchLastPlayed = (timeElapsedDays > 1) ? timeElapsedDays + " days ago" : "a day ago";
		} else {
			const timeElapsedMonths = Math.floor(timeElapsedSeconds / secondsPerMonth);
			matchLastPlayed = (timeElapsedMonths > 1) ? timeElapsedMonths + " months ago" : "a month ago";
		}
		return matchLastPlayed;
  };

  let highestChampDamage = 0;
  playersData.forEach((player) => {
		const playerTeamId = player.teamId;
		if (!teamData[playerTeamId]) {
			teamData[playerTeamId] = [];
		}
		const playerStatRunes = player.perks.statPerks;
		const playerRunes = player.perks.styles;
		const playerPrimaryRunes = playerRunes[0];
		const playerSecondaryRunes = playerRunes[1];
    const playerChampDamage = player.totalDamageDealtToChampions;
    highestChampDamage = Math.max(highestChampDamage, playerChampDamage);
		const playerData = {
      teamId: player.teamId,
			name: player.riotIdGameName,
			tagline: player.riotIdTagline,
			timePlayed: player.timePlayed,
			champion: player.championName,
			matchResult: getMatchResult(player),
			kills: player.kills,
			deaths: player.deaths,
			assists: player.assists,
      champDamage: playerChampDamage,
			level: player.champLevel,
			role: player.teamPosition,
			items: [
				player.item0,
				player.item1,
				player.item2,
				player.item3,
				player.item4,
				player.item5,
				player.item6,
			],
			summonerSpells: [player.summoner1Id.toString(), player.summoner2Id.toString()],
			primaryRunes: {
				primaryTree: playerPrimaryRunes.style,
				runes: playerPrimaryRunes.selections.map(
					(selection) => selection.perk
				),
			},
			secondaryRunes: {
				secondaryTree: playerSecondaryRunes.style,
				runes: playerSecondaryRunes.selections.map(
					(selection) => selection.perk
				),
			},
      visionScore: player.visionScore,
      creepScore: player.totalMinionsKilled,
      goldEarned: player.goldEarned,
      doubleKills: player.doubleKills,
      tripleKills: player.tripleKills,
      quadraKills: player.quadraKills,
      pentaKills: player.pentaKills,
		};
		teamData[playerTeamId].push(playerData);
		if (player.riotIdGameName === summonerName) {
			myPlayer = playerData;
		}
	});

  const orderTeamByRole = (team) => {
		const roleOrder = {
			TOP: 1,
			JUNGLE: 2,
			MIDDLE: 3,
			BOTTOM: 4,
			UTILITY: 5,
		};

		return matchInfo.gameMode === 'ARAM' ? team :
		team.sort((a, b) => {
			return roleOrder[a.role] - roleOrder[b.role];
		});
	};

  const getSummonerSpells = (player) => {
    const summonerSpell1 = summonerSpells.find(summonerSpell => summonerSpell.key === player.summonerSpells[0]).name;
	  const summonerSpell2 = summonerSpells.find(summonerSpell => summonerSpell.key === player.summonerSpells[1]).name;
    return [summonerSpell1, summonerSpell2];
  };
  
  const getPrimaryRune = (player) => {
    const primaryTreeId = player.primaryRunes.primaryTree.toString().trim();
    const primaryTreeKeystones = runes.find(runeTrees => runeTrees.id.toString().trim() === primaryTreeId).slots[0].runes;
    const primaryKeystoneId = player.primaryRunes.runes[0].toString().trim();
    const primaryKeystone = primaryTreeKeystones.find(keystone => keystone.id.toString().trim() === primaryKeystoneId).icon;
    return primaryKeystone;
  };
  
  const getSecondaryTree = (player) => {
    const secondaryTreeId = player.secondaryRunes.secondaryTree.toString().trim();
    const secondaryTree = runes.find(runeTrees => runeTrees.id.toString().trim() === secondaryTreeId).icon;
    return secondaryTree;
  };

  const calculateKDA = (kills, deaths, assists) => {
		if (deaths === 0) deaths = 1;
		return ((kills + assists) / deaths).toFixed(2)
	};

  const getKDAColor = (kda) => {
    if (kda >= 5.00) return 'text-amber-600';
    else if (kda >= 3.00) return 'text-violet-950';
    else if (kda >= 2.00) return 'text-indigo-950';
    else if (kda >= 1.00) return 'text-zinc-800';
    else return 'text-slate-800';
  }

  const getBackgroundColor = (isMyTeam) => {
    if (myPlayer.matchResult === 'Victory') {
      return isMyTeam ? 'bg-victory-bg' : 'bg-defeat-bg';
    } else if (myPlayer.matchResult === 'Defeat') {
      return isMyTeam ? 'bg-defeat-bg' : 'bg-victory-bg';
    } else return 'bg-remake-bg';
  };

  const getBackgroundFocusColor = () => {
    if (myPlayer.matchResult === 'Victory') return 'hover:bg-victory-bg-focus active:bg-victory-bg-focus';
    else if (myPlayer.matchResult === 'Defeat') return 'hover:bg-defeat-bg-focus active:bg-defeat-bg-focus';
    else return 'hover:bg-remake-bg-focus active:bg-remake-bg-focus';
  };

  const getItemBackgroundColor = (player) => {
    if (player.matchResult === 'Victory') return 'bg-victory-item-bg';
    else if (player.matchResult === 'Defeat') return 'bg-defeat-item-bg';
    else return 'bg-remake-item-bg';
  };

  const getBorderHighlightColor = () => {
    if (myPlayer.matchResult === 'Victory') return 'border-l-victory-highlight';
    else if (myPlayer.matchResult === 'Defeat') return 'border-l-defeat-highlight';
    else return 'border-l-remake-highlight';
  };

  const getBackgroundHighlightColor = () => {
    if (myPlayer.matchResult === 'Victory') return 'bg-victory-highlight';
    else if (myPlayer.matchResult === 'Defeat') return 'bg-defeat-highlight';
    else return 'bg-remake-highlight';
  };

  const myTeam = Object.values(teamData).find(team => team.includes(myPlayer));
  const enemyTeam = Object.values(teamData).find(team => !team.includes(myPlayer));

  const teamsObjectivesData = {};
  matchInfo.teams.map((team) => {
    const objectivesData = team.objectives;
    teamsObjectivesData[team.teamId] = {
      grubKills: [objectivesData.horde.kills, <GiDrippingHoney className='size-fit' />],
      dragonKills: [objectivesData.dragon.kills, <GiSeaDragon className='size-fit' />],
      riftKills: [objectivesData.riftHerald.kills, <GiEyestalk className='size-fit' />],
      baronKills: [objectivesData.baron.kills, <GiHydra className='size-fit' />],
      towerKills: [objectivesData.tower.kills, <GiTowerFall className='size-fit' />],
    };
  });

  const getTeamOverallStats = (team) => { 
    let kills = 0;
    let deaths = 0;
    let assists = 0;
    let gold = 0;
    team.map((player) => {
      kills += player.kills;
      deaths += player.deaths;
      assists += player.assists;
      gold += player.goldEarned;
    });
    return {
      'objectives': teamsObjectivesData[team[0].teamId],
      'side': team[0].teamId === 100 ? 'Blue' : 'Red',
      'kills': kills,
      'deaths': deaths,
      'assists': assists,
      'gold': gold,
    };
  };

  const myTeamOverallStats = getTeamOverallStats(myTeam);
  const enemyTeamOverallStats = getTeamOverallStats(enemyTeam);

  myTeamOverallStats['matchResult'] = myPlayer.matchResult;
  enemyTeamOverallStats['matchResult'] = 
    (myPlayer.matchResult === 'Victory') ? 'Defeat' : (myPlayer.matchResult === 'Defeat') ? 'Victory' : 'Remake';

  const calculateKP = (player, teamKills) => {
    if (teamKills === 0) return 0;
    return Math.round(((player.kills + player.assists) / teamKills) * 100);
  };

  const calculateCSM = (player) => {
    const gameDurationSeconds = matchInfo.gameDuration;
		const minutes = Math.floor((gameDurationSeconds % 3600) / 60);
    if (minutes === 0) return player.creepScore;
    return (player.creepScore / minutes).toFixed(1);
  };

  const getPlayerHighestMultiKills = (player) => {
    if (player.pentaKills > 0) {
      return ['Penta Kill', <GiPentarrowsTornado className='size-fit'/>];
    } else if (player.quadraKills > 0) {
      return ['Quadra Kill', <PiDiamondsFour className='size-fit' />];
    } else if (player.tripleKills > 0) {
      return ['Triple Kill', <GiTripleScratches className='size-fit'/>];
    } else if (player.doubleKills > 0) {
      return ['Double Kill', <HiChevronDoubleUp className='size-fit'/>];
    } else {
      return [undefined, undefined];
    }
  };

  const getPlayerMatchStats = (player, teamKills) => {
    const playerKDA = calculateKDA(player.kills, player.deaths, player.assists);
    const playerHighestMultiKills = getPlayerHighestMultiKills(player);
    const champDamage = player.champDamage;
    const champDamagePercentage = Math.floor((champDamage / highestChampDamage) * 100);
    return {
      'name': player.name,
      'tagline': player.tagline,
      'level': player.level,
      'champion': player.champion,
      'summonerSpells': getSummonerSpells(player),
      'primaryRune': getPrimaryRune(player),
      'secondaryTree': getSecondaryTree(player),
      'items': player.items,
      'itemBackgroundColor': getItemBackgroundColor(player),
      'kills': player.kills,
      'deaths': player.deaths,
      'assists': player.assists,
      'champDamage': champDamage,
      'champDamagePercentage': champDamagePercentage,
      'kda': playerKDA,
      'kdaColor': getKDAColor(playerKDA),
      'kp': calculateKP(player, teamKills),
      'cs': player.creepScore,
      'csm': calculateCSM(player),
      'goldEarned': player.goldEarned,
      'multiKill': playerHighestMultiKills[0],
      'multiKillIcon': playerHighestMultiKills[1],
      'multiKillBackground': getBackgroundHighlightColor(player),
      'side': player.side,
    };
  };

  const myPlayerStats = {
    ...getPlayerMatchStats(myPlayer, myTeamOverallStats.kills),
    'matchResult': myPlayer.matchResult,
    'borderHighlightColor': getBorderHighlightColor(),
    'backgroundColor': getBackgroundColor(true),
    'enemyBackgroundColor': getBackgroundColor(false),
    'backgroundFocusColor': getBackgroundFocusColor(),
    'matchTimeCompact': getMatchTime(true),
    'matchTime': getMatchTime(false),
    'matchLastPlayed': calculateMatchLastPlayed(),
    'gameMode': gameModes.find(gameMode => gameMode.queueId === matchInfo.queueId).gameMode,
  };

  const myTeamStats = [];
  const enemyTeamStats = [];
  myTeam.map((player) => myTeamStats.push(getPlayerMatchStats(player, myTeamOverallStats.kills)));
  enemyTeam.map((player) => enemyTeamStats.push(getPlayerMatchStats(player, enemyTeamOverallStats.kills)));

  return (
    <div className={`rounded border-1.5 border-slate-950`}>
      <div
        className={`flex flex-col laptop:flex-row w-full rounded-t ${!showFullDetails && 'rounded-b'} px-1.5 tablet:px-2 py-1 hover:cursor-pointer
          border-l-5 ${myPlayerStats.borderHighlightColor} ${myPlayerStats.backgroundColor} ${myPlayerStats.backgroundFocusColor}
        `}
        key={metadata.id}
        onClick={() => { setShowFullDetails(!showFullDetails) }}
      >
        <div className='flex laptop:flex-col justify-between laptop:text-start text-xs laptop:w-20'>
          <div className='flex laptop:flex-col gap-x-1.5 laptop:gap-0 font-semibold font-[Raleway] text-slate-950'>
            {myPlayerStats.gameMode}
            <span>{`(${myPlayer.matchResult})`}</span>
          </div>
          <div className='flex laptop:flex-col gap-x-2 laptop:gap-0 text-slate-900 font-medium laptop:font-normal'>
            <div className='hidden laptop:flex'>{myPlayerStats.matchTime}</div>
            <div className='laptop:hidden flex'>{myPlayerStats.matchTimeCompact}</div>
            {myPlayerStats.matchLastPlayed}
          </div>
        </div>
        <div className='flex grow tablet:mt-1 tablet:mb-0.5 laptop:my-0'>
          <div className='flex tablet:flex-col grow tablet:grow-0 laptop:ml-5'>
            <div className='flex gap-x-2'>
              <div className='relative size-12 tablet:size-14 my-0.5 laptop:my-0'>
                <img src={`${AWS_S3_URL}/champion/${myPlayer.champion}.png`} className='relative [clip-path:circle(45%)]'/>
                <span className='flex items-center justify-center rounded-full size-4 p-2 mr-0.5 mb-0.5 absolute bottom-0 right-0
                  bg-slate-400 font-semibold text-xs text-slate-900'
                >
                  {myPlayer.level}
                </span>
              </div>
              <div className='flex flex-col mt-1 gap-y-1'>
                <div className='flex gap-x-1.5'>
                  {myPlayerStats.summonerSpells.map((spell) => (
                    <img src={`${AWS_S3_URL}/summoner-spells/${spell}.png`} className='rounded size-5 tablet:size-6' />
                  ))}
                </div>
                <div className='flex gap-x-1.5'>
                  <img src={`${AWS_S3_URL}/${myPlayerStats.primaryRune}`} className='size-5 tablet:size-6' />
                  <div className='flex items-center justify-center size-5 tablet:size-6'>
                    <img src={`${AWS_S3_URL}/${myPlayerStats.secondaryTree}`} className='tablet:w-5 h-4 tablet:h-[18px]' />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center ml-auto tablet:ml-0 tablet:mt-auto'>
              <div className='flex mb-1.5 tablet:mb-0.5 laptop:mb-1 gap-x-1'>
                {myPlayer.items.map((item) => (
                  (item !== 0)
                  ? <img src={`${AWS_S3_URL}/item/${item}.png`} className='rounded size-5 tablet:size-6 laptop:size-7'/>
                  : <div className={`rounded size-5 tablet:size-6 laptop:size-7 ${myPlayerStats.itemBackgroundColor}`} />
                ))}
              </div>
              <div className='flex tablet:hidden gap-x-0.5 text-sm'>
                <span className='font-medium text-slate-950'>{myPlayer.kills}</span>
                <span className='text-slate-700'>/</span><span className='text-red-800'>{myPlayer.deaths}</span>
                <span className='text-slate-700'>/</span><span className='font-medium text-slate-900'>{myPlayer.assists}</span>
                <span className={`ml-auto font-medium ${myPlayerStats.kdaColor}`}>{`${myPlayerStats.kda} KDA`}</span>
              </div>
            </div>
          </div>
          <div className='hidden tablet:flex grow justify-center gap-x-12 mb-1'>
            <div className='flex flex-col items-center gap-y-1'>
              <div className='flex gap-x-0.5'>
                <span className='font-medium text-slate-950'>{myPlayer.kills}</span>
                <span className='text-slate-700'>/</span><span className='text-red-800'>{myPlayer.deaths}</span>
                <span className='text-slate-700'>/</span><span className='font-medium text-slate-900'>{myPlayer.assists}</span>
              </div>
              <span className={`font-medium ${myPlayerStats.kdaColor}`}>{`${myPlayerStats.kda} KDA`}</span>
              {myPlayerStats.multiKill &&
                <div className={`flex justify-center items-center rounded mt-auto px-1 gap-x-1 text-sm ${myPlayerStats.multiKillBackground}`}>
                  {myPlayerStats.multiKillIcon}
                  <span>{`${myPlayerStats.multiKill}`}</span>
                </div>
              }
            </div>
            <div className='flex flex-col items-center gap-y-0.5'>
              <span>{`${myPlayerStats.kp}% KP`}</span>
              <span>{`${myPlayer.creepScore} CS (${myPlayerStats.csm})`}</span>
              <span className='text-sm'>{`Vision: ${myPlayer.visionScore}`}</span>
            </div>
          </div>
          <div className='hidden tablet:flex ml-auto gap-x-4'>
            {Object.values(teamData).map((team) => (
              <span className='flex flex-col gap-y-0.5'>
                {orderTeamByRole(team).map((player) => (
                  <div className='flex gap-x-1' key={player.name}>
                    <img
                      src={`${AWS_S3_URL}/champion/${player.champion}.png`}
                      className='rounded-sm size-[18px]'
                    />
                    <a 
                      href={`/summoners/${region}/${player.name}-${player.tagline}`}
                      className={`w-20 truncate hover:underline text-start text-xs font-[Raleway] 
                      ${myPlayer.name === player.name ? 'font-semibold' : 'font-medium'}`}
                    >
                      {player.name}
                    </a>
                  </div>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showFullDetails && 
        <div className='flex flex-col'>
          <div className='flex justify-evenly py-1 border-t-1.5 border-slate-900 text-sm text-zinc-300/95 bg-slate-800'>
            {'Overview'} <span>{'Build'}</span>
          </div>
          <AdvancedMatch 
            overallTeamStats={myTeamOverallStats} 
            teamStats={myTeamStats} 
            myPlayerStats={myPlayerStats} 
            isMyTeam={true} 
            region={region} 
          />
          <AdvancedMatch 
            overallTeamStats={enemyTeamOverallStats}
            teamStats={enemyTeamStats} 
            myPlayerStats={myPlayerStats} 
            isMyTeam={false} 
            region={region} 
          />
        </div>
      }
    </div>
  )
}
export default Match;