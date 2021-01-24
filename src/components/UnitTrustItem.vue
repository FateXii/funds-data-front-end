<template>
  <div
    class="trust-item"
    v-if="trust.lump_returns.three_months"
  >
    <div class="trust-info">
      <div
        class="current-effective-interest"
      >{{trust.lump_returns.three_months}}</div>
      <div class="trust-overview">
        <h3 class="trust-name">{{trust.name}}</h3>
        <div class="tags">
          <span
            v-if="riskRating"
            class="tag risk"
            risk-rating="riskRating"
          >{{riskRating}} risk</span>
          <span
            class="tag track-record"
            v-if="trackRecord"
          >{{trackRecord}} record</span>
        </div>
      </div>
    </div>
    <div
      @click="openObjectiveModal"
      class="trust-description"
    >{{trust.objectives}}</div>
    <div
      id="fund-objective-modal"
      v-if="showObjectiveModal"
    >
      <div id="objective-text-container">
        <div id="objective-text">
          <p>
            <span
              @click="closeObjectiveModal"
              id="fund-objective-close"
            >X</span>
            {{trust.objectives}}
          </p>
        </div>
      </div>
    </div>
    <div id="returns-summary">
      <h3>Esimated returns</h3>
      <div
        v-for="currentReturn in Object.keys(calculatedReturns)"
        :key="currentReturn"
      >
        Esimated returns based on the last {{currentReturn}} :
        {{calculatedReturns[currentReturn].toFixed(2)}}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { FVwithInstallments } from '../assets/services';

export default {
  props: {
    savingGoal: {
      type: Object,
      required: false,
    },
    trust: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { trust, savingGoal } = toRefs(props);
    const calculatedReturns = reactive({});
    let riskRating = null;
    const showObjectiveModal = ref(false);
    if (
      trust.value.risk_rating !== undefined
      || trust.value.risk_rating !== '-'
    ) {
      [riskRating] = trust.value.risk_rating.split('-');
      riskRating = riskRating.toLowerCase();
    }
    const returns = trust.value.lump_returns;
    let trackRecord = null;
    function processKey(property = '') {
      return property
        .split('_')
        .map((word) => {
          const [firstLetter, ...rest] = word.split('');
          const returnWord = [firstLetter.toUpperCase(), ...rest].join('');
          return returnWord;
        })
        .join(' ');
    }
    function openObjectiveModal() {
      if (!showObjectiveModal.value) {
        showObjectiveModal.value = true;
      }
    }
    function closeObjectiveModal() {
      if (showObjectiveModal.value) {
        showObjectiveModal.value = false;
      }
    }
    Object.keys(returns).forEach((period) => {
      calculatedReturns[processKey(period)] = FVwithInstallments(
        savingGoal.value.initialInvestment,
        savingGoal.value.monthlyInstallment,
        returns[period] ? returns[period] / 100 : 0,
        0,
        savingGoal.value.investmentTime,
      );
      if (period === 'ten_years') {
        if (returns[period]) {
          trackRecord = 'long';
        }
      } else if (period === 'five_years' || period === 'three_years') {
        if (returns[period]) {
          trackRecord = 'medium';
        }
      } else if (period === 'one_year' || period === 'six_months') {
        if (returns[period]) {
          trackRecord = 'immediate';
        }
      } else if (period === 'three_months') {
        if (returns[period]) {
          trackRecord = 'current';
        }
      }
    });

    return {
      riskRating,
      trackRecord,
      calculatedReturns,
      showObjectiveModal,
      openObjectiveModal,
      closeObjectiveModal,
    };
  },
};
</script>

<style lang="postcss" scoped>
#returns-summary {
  margin: 1em 0;
}
#fund-objective-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 25vh 0;
}
#objective-text {
  display: flex;
  flex-flow: column nowrap;
  background-color: black;
  color: white;
  height: 50vh;
  overflow: scroll;
  padding: 2em 0;
}
#fund-objective-close {
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 20vw;
  max-width: 50px;
  height: 20vw;
  max-height: 50px;
  font-size: 2.5em;
  border: 1px solid black;
  border-radius: 50%;
  border-color: white;
  margin-right: 0.5em;
}
.trust-item {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.trust-info {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  /*align-items: center;*/
  justify-items: baseline;
  padding: 1em;
}

.trust-overview {
  display: flex;
  flex-flow: column nowrap;
  width: 80vw;
}
.trust-name {
  width: 100%;
  text-align: left;
  padding: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  height: 1.5em;
  overflow: hidden;
}

.tags {
  display: flex;
  flex-flow: row;
  justify-content: left;
}
.tag {
  border: 1px solid blue;
  border-radius: 0.5em;
  padding: 0 0.25em;
  margin-right: 0.5em;
}

.current-effective-interest {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20vw;
  max-width: 50px;
  height: 20vw;
  max-height: 50px;
  font-size: 1em;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 0.5em;
}

.trust-description {
  padding: 0 1em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-align: justify;
  width: 100%;
  height: 20vw;
  max-height: 100px;
}
</style>
