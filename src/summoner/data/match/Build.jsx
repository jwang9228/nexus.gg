import runes from '../../../metadata/runes.json';
import statmods from '../../../metadata/statmods.json';

function Build({primaryTreeId, primaryRunes, secondaryTreeId, secondaryRunes, statRunes}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  console.log(statRunes)

  /**
   * Gets the tree object defined in runes.json given a tree ID
   * @param treeID tree ID 
   * @returns tree object associated with tree ID
   */
  const getTreeByID = (treeID) => {
    return runes.find(runeTrees => runeTrees.id.toString() === treeID);
  };

  /**
   * Gets the main primary tree keystones (excludes runes). 
   * A tree has 3 keystones.
   * @returns primary tree keystones
   */
  const getPrimaryTreeKeystones = () => {
    const primaryTree = getTreeByID(primaryTreeId);
    return primaryTree.slots[0].runes;
  };

  /**
   * Gets all runes for a tree (excludes keystones) given tree ID 
   * A tree has 3 rows of 3 runes.
   * @returns tree runes associated with tree ID
   */
  const getTreeRunesByID = (treeID) => {
    const primaryTree = getTreeByID(treeID);
    return primaryTree.slots.slice(1);
  };

  /**
   * Gets all statmods where each element is a statmod group.
   * 
   * Three statmod groups: offense, flex, defense.
   * Each statmod group has 3 statmods formatted by statmods.json
   * @returns list of all statmods
   */
  const getStatmods = () => {
    const myOffenseID = statRunes.offense;
    const myFlexID = statRunes.flex;
    const myDefenseID = statRunes.defense;

    const offenseGroupIDs = [5008, 5005, 5007];
    const flexGroupIDs = [5008, 5010, 5001];
    const defenseGroupIDs = [5011, 5013, 5001];
    const allGroupsIDs = [offenseGroupIDs, flexGroupIDs, defenseGroupIDs];
    
    const allStatmods = allGroupsIDs.map((groupIDs, groupIndex) => 
      groupIDs.map(statmodID => {
        const statmod = statmods.find(statmod => statmod.id === statmodID);
        if (groupIndex === 0) {
          return {...statmod, 'active': statmod.id === myOffenseID};
        } else if (groupIndex === 1) {
          return {...statmod, 'active': statmod.id === myFlexID};
        } else {
          return {...statmod, 'active': statmod.id === myDefenseID};
        }
      })
    );
    return allStatmods;
  }; 

  const myBuildStats = {
    'primaryTreeKeystones': getPrimaryTreeKeystones(),
    'primaryTreeRunes': getTreeRunesByID(primaryTreeId),
    'secondaryTreeRunes': getTreeRunesByID(secondaryTreeId),
    'statmods': getStatmods()
  };

  return (
    <div className='flex border-t-1.5 border-slate-900 bg-slate-800'>
      {/* TODO: icon with tree name (Ex: domination/precision)*/}
      <div className='flex flex-col w-1/2 px-6 py-2'>
        <div className='flex justify-center gap-x-2'>
          {myBuildStats.primaryTreeKeystones.map(keystone => (
            <img 
              src={`${AWS_S3_URL}/${keystone.icon}`} 
              className={`size-8 
                ${!primaryRunes.includes(keystone.id) && 'grayscale'}`
              }
            />
          ))}
        </div>
        <div className='flex flex-col gap-y-1.5 mt-auto mb-1'>
          {myBuildStats.primaryTreeRunes.map(runeSet => (
            <div className='flex justify-center gap-x-4'>
              {runeSet.runes.map(rune => (
                <img 
                  src={`${AWS_S3_URL}/${rune.icon}`} 
                  className={`size-6 
                    ${!primaryRunes.includes(rune.id) && 'grayscale'}`
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col w-1/2 gap-y-2 px-6 py-2 mt-0.5'>
        <div className='flex flex-col gap-y-1.5'>
          {myBuildStats.secondaryTreeRunes.map(runeSet => (
            <div className='flex justify-center gap-x-4'>
              {runeSet.runes.map(rune => (
                <img 
                  src={`${AWS_S3_URL}/${rune.icon}`} 
                  className={`size-5 
                    ${!secondaryRunes.includes(rune.id) && 'grayscale'}`
                  }
                />
              ))}
            </div>
          ))}
        </div>
        <div className='flex flex-col'>
          {myBuildStats.statmods.map(statmodRow => (
            <div className='flex justify-center gap-x-4'> 
              {statmodRow.map(statmod => (
                <img 
                  src={`${AWS_S3_URL}/${statmod.icon}`} 
                  className={`size-5
                    ${!statmod.active && 'grayscale'}`
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
export default Build;