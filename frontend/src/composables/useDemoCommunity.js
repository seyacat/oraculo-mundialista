import { computed } from 'vue'
import { demoCommunities, emptyCommunityState, getDemoCommunityBySlug } from '../lib/mock-data/communities'
import { demoMatches, emptyPredictionsState, getOpenMatches } from '../lib/mock-data/matches'
import { demoRankings, emptyRankingState } from '../lib/mock-data/rankings'
import { demoPowers, emptyPowersState } from '../lib/mock-data/powers'
import { demoShameEntries, emptyShameState } from '../lib/mock-data/shame'
import { demoShareMoments, getShareMomentById } from '../lib/mock-data/shareMoments'

export function useDemoCommunity(slug = 'la-banda-del-mundial') {
  const community = computed(() => getDemoCommunityBySlug(slug))
  const matches = computed(() => demoMatches)
  const openMatches = computed(() => getOpenMatches(matches.value))
  const rankings = computed(() => demoRankings)
  const powers = computed(() => demoPowers)
  const shameEntries = computed(() => demoShameEntries)
  const shareMoments = computed(() => demoShareMoments)

  function getShareMoment(momentId) {
    return getShareMomentById(momentId, shareMoments.value)
  }

  return {
    communities: demoCommunities,
    community,
    matches,
    openMatches,
    rankings,
    powers,
    shameEntries,
    shareMoments,
    emptyStates: {
      community: emptyCommunityState,
      predictions: emptyPredictionsState,
      ranking: emptyRankingState,
      powers: emptyPowersState,
      shame: emptyShameState,
    },
    getShareMoment,
  }
}
