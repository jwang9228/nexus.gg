import gameModes from "./gamemodes.json";
import summonerSpells from "./summoners.json";
import runes from "./runes.json";

function Match({ matchData, summonerName, region }) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const metadata = matchData.metadata;
	const matchInfo = matchData.info;

  if (!gameModes.find(gameMode => gameMode.queueId === matchInfo.queueId)) return;

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

  playersData.forEach((player) => {
		const playerTeamId = player.teamId;
		if (!teamData[playerTeamId]) {
			teamData[playerTeamId] = [];
		}
		const playerStatRunes = player.perks.statPerks;
		const playerRunes = player.perks.styles;
		const playerPrimaryRunes = playerRunes[0];
		const playerSecondaryRunes = playerRunes[1];
		const playerData = {
			name: player.riotIdGameName,
			tagline: player.riotIdTagline,
			timePlayed: player.timePlayed,
			champion: player.championName,
			matchResult: getMatchResult(player),
			kills: player.kills,
			deaths: player.deaths,
			assists: player.assists,
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

  const getSummonerSpells = () => {
    const summonerSpell1 = summonerSpells.find(summonerSpell => summonerSpell.key === myPlayer.summonerSpells[0]).name;
	  const summonerSpell2 = summonerSpells.find(summonerSpell => summonerSpell.key === myPlayer.summonerSpells[1]).name;
    return [summonerSpell1, summonerSpell2];
  };
  
  const getPrimaryRune = () => {
    const primaryTreeId = myPlayer.primaryRunes.primaryTree.toString().trim();
    const primaryTreeKeystones = runes.find(runeTrees => runeTrees.id.toString().trim() === primaryTreeId).slots[0].runes;
    const primaryKeystoneId = myPlayer.primaryRunes.runes[0].toString().trim();
    const primaryKeystone = primaryTreeKeystones.find(keystone => keystone.id.toString().trim() === primaryKeystoneId).icon;
    return primaryKeystone;
  };
  
  const getSecondaryTree = () => {
    const secondaryTreeId = myPlayer.secondaryRunes.secondaryTree.toString().trim();
    const secondaryTree = runes.find(runeTrees => runeTrees.id.toString().trim() === secondaryTreeId).icon;
    return secondaryTree;
  };

  const getBackgroundColor = () => {
    if (myPlayer.matchResult === 'Victory') return 'bg-[#506ca6]';
    else if (myPlayer.matchResult === 'Defeat') return 'bg-[#a0575c]';
    else return 'bg-[#9b9b9b]';
  };

  const getBackgroundFocusColor = () => {
    if (myPlayer.matchResult === 'Victory') return 'hover:bg-[#46639e] active:bg-[#46639e]';
    else if (myPlayer.matchResult === 'Defeat') return 'hover:bg-[#944c51] active:bg-[#944c51]';
    else return 'hover:bg-[#929191] active:bg-[#929191]';
  };

  const getItemBackground = () => {
    if (myPlayer.matchResult === 'Victory') return 'bg-[#3f5684]';
    else if (myPlayer.matchResult === 'Defeat') return 'bg-[#7f4549]';
    else return 'bg-[#828282]';
  }

  const getBorderHighlightColor = () => {
    if (myPlayer.matchResult === 'Victory') return 'border-l-[#3785c4]';
    else if (myPlayer.matchResult === 'Defeat') return 'border-l-[#c43739]';
    else return 'border-l-[#c6c6c6]';
  };

  return (
    <div className='rounded border-1.5 border-slate-950'>
      <button
        type='button' 
        className={`flex flex-col laptop:flex-row w-full rounded px-1.5 tablet:px-2 py-1 
          border-l-5 ${getBorderHighlightColor()} ${getBackgroundColor()} ${getBackgroundFocusColor()}
        `}
        key={metadata.id}
      >
        <div className='flex laptop:flex-col justify-between laptop:text-start text-xs laptop:w-20'>
          <div className='flex laptop:flex-col gap-x-1.5 laptop:gap-0 font-semibold font-[Raleway] text-slate-950'>
            {gameModes.find(gameMode => gameMode.queueId === matchInfo.queueId).gameMode}
            <span>{`(${myPlayer.matchResult})`}</span>
          </div>
          <div className='flex laptop:flex-col gap-x-2 laptop:gap-0 text-slate-900'>
            <div className='hidden laptop:flex'>{getMatchTime(false)}</div>
            <div className='laptop:hidden flex'>{getMatchTime(true)}</div>
            {calculateMatchLastPlayed()}
          </div>
        </div>
        <div className='flex grow tablet:mt-1 tablet:mb-0.5 laptop:my-0'>
          <div className='flex tablet:flex-col laptop:ml-5'>
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
                  {getSummonerSpells().map((spell) => (
                    <img src={`${AWS_S3_URL}/summoner-spells/${spell}.png`} className='rounded size-5 tablet:size-6' />
                  ))}
                </div>
                <div className='flex gap-x-1.5'>
                  <img src={`${AWS_S3_URL}/${getPrimaryRune()}`} className='size-5 tablet:size-6' />
                  <div className='flex items-center justify-center size-5 tablet:size-6'>
                    <img src={`${AWS_S3_URL}/${getSecondaryTree()}`} className='tablet:w-5 h-4 tablet:h-[18px]' />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex mt-auto tablet:mb-0.5 laptop:mb-1 gap-x-1'>
              {myPlayer.items.map((item) => (
                (item !== 0)
                ? <img src={`${AWS_S3_URL}/item/${item}.png`} className='rounded size-5 tablet:size-6 laptop:size-7'/>
                : <div className={`rounded size-5 tablet:size-6 laptop:size-7 ${getItemBackground()}`} />
              ))}
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
      </button>
    </div>
  )
}
export default Match;