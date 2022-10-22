<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">Text to Emoji</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">Turn messages into Discord emojis!</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded">
        <div>
          <h1 class="mb-1 text-3xl font-bold text-center text-white">Text:</h1>
          <div class="relative text-gray-600 focus-within:text-gray-400 transition duration-250">
            <div class="w-full lg:w-4/12 mx-auto">
              <span class="absolute inset-y-0 items-center pl-3 pt-1.5 text-gray-200">
                <font-awesome-icon :icon="['fas', 'link']" />
              </span>
              <input
                name="text"
                class="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 transition duration-250 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
                placeholder="Hello Everyone!"
                v-model="text"
                autocomplete="off"
              />
            </div>
          </div>
          <transition name="height">
            <div v-if="text" class="mt-5">
              <h1 class="mb-1 text-3xl font-bold text-center text-white">Output:</h1>
              <transition name="height">
                <p v-if="text" class="text-md text-gray-200 text-center">
                  <code>{{ convertString(text) }}</code>
                </p>
              </transition>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.height-enter-active,
.height-leave-active {
  transition: all 0.2s;
  max-height: 230px;
  overflow: hidden;
}

.height-enter, .height-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0px;
}
</style>

<script>
import axios from 'axios';

export default {
  methods: {
    abbNum: (val) => {
      let newValue = val;
      const suffixes = ['', 'k', 'm', 'b', 't'];
      let suffixNum = 0;
      while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
      }

      newValue = newValue.toPrecision(3);

      newValue += suffixes[suffixNum];
      return newValue;
    },
    addCommas(x) {
      x = x.toString();
      let pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
      return x;
    },
    sentanceCap(str) {
      return str
        .toLowerCase()
        .replace(/_/g, ' ')
        .split(' ')
        .map(function (word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
    },
    convertString(str) {
      const strArr = str.split('');
      let output = '';

      strArr.forEach((c) => {
        if (!/[^a-zA-Z]/.test(c)) {
          output += ':regional_indicator_' + c.toLowerCase() + ': ';
        } else if (c == '0') {
          output += ':zero: ';
        } else if (c == '1') {
          output += ':one: ';
        } else if (c == '2') {
          output += ':two: ';
        } else if (c == '3') {
          output += ':three: ';
        } else if (c == '4') {
          output += ':four: ';
        } else if (c == '5') {
          output += ':five: ';
        } else if (c == '6') {
          output += ':six: ';
        } else if (c == '7') {
          output += ':seven: ';
        } else if (c == '8') {
          output += ':eight: ';
        } else if (c == '9') {
          output += ':nine: ';
        } else if (c == '#') {
          output += ':hash: ';
        } else if (c == '*') {
          output += ':asterisk: ';
        } else if (c == '>') {
          output += ':arrow_forward: ';
        } else if (c == '<') {
          output += ':arrow_backward: ';
        } else if (c == '!') {
          output += ':exclamation: ';
        } else if (c == '?') {
          output += ':question: ';
        } else if (c == ' ') {
          output += ' ';
        } else if (c == 'à') {
          output += ':regional_indicator_a:';
        }
        else if (c == 'ç') {
          output += ':regional_indicator_c:';
        }
        else if (c == 'é' || c == 'è' || c == 'ë') {
          output += ':regional_indicator_e:';
        }
        else if (c == 'ï' || c == 'î' || c == 'ì') {
          output += ':regional_indicator_i:';
        } 
        else if (c == 'à' || c == 'ä' ) {
          output += ':regional_indicator_a:'
        } 
        else if (c == 'ñ') {
          output +=':regional_indicator_n:'
        } 
        else if (c == '=') {
          output += ':heavy_equals_sign:';
        } 
        else if (c == '+') {
          output += ':heavy_plus_sign:';
        } 
        else if (c == '-') {
          output += ':heavy_minus_sign:';
        } 
        else if (c == '$') {
          output += ':heavy_dollar_sign:';
        } 
        else if (c == '+') {
          output += ':heavy_plus_sign:';
        }
      });

      return output;
    },
  },
  data() {
    return {
      text: '',
    };
  },
};
</script>
