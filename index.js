/**
 * Marina Recipes - Alexa Skill
 * Based on Kay Quade's "5 Minute Recipes" Voice Design (2.4 & 2.5)
 *
 * HOW TO USE:
 *  1. Go to https://developer.amazon.com/alexa/console/ask
 *  2. Create a new skill → Custom model → Alexa-hosted (Node.js)
 *  3. Replace the default index.js with this file
 *  4. In the Interaction Model, set the invocation name to "marina recipes"
 *  5. Add the intents listed at the bottom of this file to your model
 *  6. Save & Build model, then test
 */
const Alexa = require('ask-sdk-core');
// ─── Recipes Data ────────────────────────────────────────────────────────────
const RECIPES = {
  scrambled_eggs: {
    name: 'Scrambled Eggs',
    number: 1,
    tags: ['eggs'],
    ingredients: ['2 eggs', '1 tablespoon of butter', 'salt', 'pepper'],
    steps: [
      'Crack the eggs into a bowl and whisk them.',
      'Melt butter in a pan over medium heat.',
      'Pour in the eggs.',
      'Stir gently until they\'re fluffy and cooked through.',
      'Season with salt and pepper. Your scrambled eggs are ready!'
    ]
  },
  avocado_toast: {
    name: 'Avocado Toast',
    number: 2,
    tags: ['vegetarian'],
    ingredients: ['1 slice of bread', 'half an avocado', 'salt', 'pepper', 'optional red pepper flakes'],
    steps: [
      'Toast your bread.',
      'Mash the avocado in a bowl.',
      'Spread the mashed avocado on the toast.',
      'Sprinkle with salt and pepper.',
      'Add red pepper flakes if you like. Your avocado toast is ready!'
    ]
  },
  yogurt_parfait: {
    name: 'Yogurt Parfait',
    number: 3,
    tags: ['vegetarian'],
    ingredients: ['1 cup of yogurt', 'quarter cup of granola', 'half cup of berries', '1 tablespoon of honey'],
    steps: [
      'Put half the yogurt in a glass or bowl.',
      'Add half the granola and berries.',
      'Add the remaining yogurt.',
      'Top with the rest of the granola and berries.',
      'Drizzle honey on top. Your yogurt parfait is ready!'
    ]
  },
  pb_banana_wrap: {
    name: 'Peanut Butter Banana Wrap',
    number: 4,
    tags: ['vegetarian'],
    ingredients: ['1 tortilla wrap', '2 tablespoons of peanut butter', '1 banana', 'optional honey'],
    steps: [
      'Lay your tortilla flat on a clean surface.',
      'Spread peanut butter evenly over the tortilla.',
      'Peel the banana and place it at one edge.',
      'Roll the tortilla tightly around the banana.',
      'Slice in half and drizzle honey if you like. Your wrap is ready!'
    ]
  }
};
const LUNCH_RECIPES = {
  turkey_wrap: {
    name: 'Turkey Wrap',
    number: 1,
    tags: [],
    ingredients: ['1 tortilla', '3 slices of turkey', 'lettuce', 'tomato', 'mustard or mayo'],
    steps: [
      'Lay the tortilla flat.',
      'Spread mustard or mayo on the tortilla.',
      'Layer turkey, lettuce, and tomato.',
      'Roll tightly and slice in half. Your turkey wrap is ready!'
    ]
  },
  caprese_salad: {
    name: 'Caprese Salad',
    number: 2,
    tags: ['vegetarian'],
    ingredients: ['2 tomatoes', 'fresh mozzarella', 'fresh basil', 'olive oil', 'salt and pepper'],
    steps: [
      'Slice tomatoes and mozzarella into rounds.',
      'Arrange alternating slices on a plate.',
      'Tuck basil leaves between the slices.',
      'Drizzle with olive oil and season with salt and pepper. Your salad is ready!'
    ]
  },
  hummus_veggie_wrap: {
    name: 'Hummus Veggie Wrap',
    number: 3,
    tags: ['vegetarian'],
    ingredients: ['1 tortilla', '3 tablespoons of hummus', 'cucumber', 'bell pepper', 'spinach'],
    steps: [
      'Spread hummus across the tortilla.',
      'Add sliced cucumber, bell pepper strips, and spinach.',
      'Roll tightly and slice in half. Your veggie wrap is ready!'
    ]
  }
};
const DINNER_RECIPES = {
  pasta_marinara: {
    name: 'Pasta Marinara',
    number: 1,
    tags: ['vegetarian'],
    ingredients: ['1 cup of pasta', 'half a cup of marinara sauce', 'garlic', 'olive oil', 'parmesan'],
    steps: [
      'Boil pasta according to package directions.',
      'In a pan, heat olive oil and sauté minced garlic for one minute.',
      'Add marinara sauce and simmer for two minutes.',
      'Drain pasta and toss with sauce.',
      'Top with parmesan. Your pasta marinara is ready!'
    ]
  },
  stir_fry: {
    name: 'Quick Veggie Stir Fry',
    number: 2,
    tags: ['vegetarian'],
    ingredients: ['1 cup of mixed vegetables', '2 tablespoons of soy sauce', 'garlic', 'ginger', 'olive oil'],
    steps: [
      'Heat olive oil in a pan or wok over high heat.',
      'Add minced garlic and ginger, stir for 30 seconds.',
      'Add vegetables and stir fry for 3 to 4 minutes.',
      'Pour in soy sauce and toss to coat.',
      'Serve over rice if desired. Your stir fry is ready!'
    ]
  }
};
const SNACK_RECIPES = {
  apple_peanut_butter: {
    name: 'Apple with Peanut Butter',
    number: 1,
    tags: ['vegetarian'],
    ingredients: ['1 apple', '2 tablespoons of peanut butter'],
    steps: [
      'Wash and slice the apple into wedges.',
      'Place peanut butter in a small bowl for dipping.',
      'Dip and enjoy! Your snack is ready.'
    ]
  },
  cheese_crackers: {
    name: 'Cheese and Crackers',
    number: 2,
    tags: [],
    ingredients: ['a handful of crackers', 'sliced cheese', 'optional grapes'],
    steps: [
      'Arrange crackers on a plate.',
      'Place cheese slices on top of each cracker.',
      'Add grapes on the side if you like. Your snack is ready!'
    ]
  }
};
const MEAL_RECIPES = {
  breakfast: RECIPES,
  lunch: LUNCH_RECIPES,
  dinner: DINNER_RECIPES,
  snack: SNACK_RECIPES
};
// ─── Helpers ─────────────────────────────────────────────────────────────────
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) {
    return "Good morning! I'm Marina from 5 Minute Recipes. Since it's breakfast time, how about some scrambled eggs or avocado toast? Or I can help with lunch, dinner, or snacks too. What would you like?";
  } else if (hour >= 11 && hour < 16) {
    return "Hi! I'm Marina from 5 Minute Recipes. Perfect timing for lunch! I can suggest something quick, or help you with breakfast, dinner, or snacks. What are you in the mood for?";
  } else if (hour >= 16 && hour < 21) {
    return "Hello! Marina here from 5 Minute Recipes. Dinner time! I've got quick recipes ready, or I can help with breakfast, lunch, or snacks. What would you like to make?";
  } else {
    return "Hey there! Marina from 5 Minute Recipes. Looking for a late-night snack? Or I can help with breakfast, lunch, or dinner too. What sounds good?";
  }
}
function getWelcomePrompt(useCount) {
  if (useCount >= 10) {
    return "Welcome! What are we cooking?";
  } else if (useCount >= 6) {
    return "Welcome back! What would you like to make today?";
  } else {
    return getTimeBasedGreeting();
  }
}
function buildRecipeList(mealType, dietaryPrefs) {
  const recipes = MEAL_RECIPES[mealType] || RECIPES;
  let available = Object.values(recipes);
  if (dietaryPrefs && dietaryPrefs.includes('no_eggs')) {
    available = available.filter(r => !r.tags.includes('eggs'));
  }
  if (dietaryPrefs && dietaryPrefs.includes('vegetarian')) {
    available = available.filter(r => r.tags.includes('vegetarian'));
  }
  return available;
}
function formatRecipeOptions(recipeList) {
  if (recipeList.length === 0) {
    return "I'm sorry, I don't have any recipes matching your preferences right now.";
  }
  const options = recipeList.map((r, i) => `Option ${i + 1}: ${r.name}`).join('. ');
  return `I have ${recipeList.length} quick recipes for you. ${options}. Which one would you like? Say the number or recipe name.`;
}
function findRecipeByInput(input, recipeList) {
  const lower = input.toLowerCase();
  // Match by number word
  const numberWords = ['one','two','three','four','five'];
  const numIndex = numberWords.indexOf(lower);
  if (numIndex !== -1 && numIndex < recipeList.length) {
    return recipeList[numIndex];
  }
  // Match by digit
  const digit = parseInt(lower, 10);
  if (!isNaN(digit) && digit >= 1 && digit <= recipeList.length) {
    return recipeList[digit - 1];
  }
  // Match by name keywords
  return recipeList.find(r => r.name.toLowerCase().includes(lower) || lower.includes(r.name.toLowerCase().split(' ')[0]));
}
function formatIngredients(recipe) {
  return recipe.ingredients.join(', ');
}
function getSessionAttr(handlerInput) {
  return handlerInput.attributesManager.getSessionAttributes();
}
function setSessionAttr(handlerInput, attrs) {
  handlerInput.attributesManager.setSessionAttributes(attrs);
}
async function getPersistentAttr(handlerInput) {
  try {
    return await handlerInput.attributesManager.getPersistentAttributes() || {};
  } catch (e) {
    return {};
  }
}
async function savePersistentAttr(handlerInput, attrs) {
  try {
    handlerInput.attributesManager.setPersistentAttributes(attrs);
    await handlerInput.attributesManager.savePersistentAttributes();
  } catch (e) {
    // Persistence not configured — silently skip
  }
}
// ─── Launch Handler ───────────────────────────────────────────────────────────
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const persistent = await getPersistentAttr(handlerInput);
    const useCount = (persistent.useCount || 0) + 1;
    await savePersistentAttr(handlerInput, { ...persistent, useCount });
    const speakOutput = getWelcomePrompt(useCount);
    const reprompt = "Would you like breakfast, lunch, dinner, or a snack?";
    setSessionAttr(handlerInput, { lastSpeech: speakOutput });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .getResponse();
  }
};
// ─── Choose Meal Handler ──────────────────────────────────────────────────────
// Handles: ChooseMealIntent (breakfast / lunch / dinner / snack)
const ChooseMealIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseMealIntent';
  },
  async handle(handlerInput) {
    const persistent = await getPersistentAttr(handlerInput);
    const dietaryPrefs = persistent.dietaryPrefs || [];
    const mealSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'meal') || 'breakfast';
    const mealType = mealSlot.toLowerCase();
    const recipeList = buildRecipeList(mealType, dietaryPrefs);
    let speakOutput;
    if (dietaryPrefs.includes('no_eggs') && mealType === 'breakfast') {
      speakOutput = `Great choice! I remember you don't eat eggs. ${formatRecipeOptions(recipeList)}`;
    } else if (dietaryPrefs.includes('vegetarian')) {
      speakOutput = `Perfect! I have vegetarian ${mealType} options ready for you since that's your preference. ${formatRecipeOptions(recipeList)}`;
    } else {
      speakOutput = `Great choice! ${formatRecipeOptions(recipeList)}`;
    }
    const reprompt = `Which ${mealType} recipe would you like? Say the number or name.`;
    const session = getSessionAttr(handlerInput);
    setSessionAttr(handlerInput, {
      ...session,
      mealType,
      recipeList: recipeList.map(r => r.name),
      lastSpeech: speakOutput
    });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .getResponse();
  }
};
// ─── Choose Recipe Handler ────────────────────────────────────────────────────
// Handles: ChooseRecipeIntent (slot: recipeChoice — name or number)
const ChooseRecipeIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseRecipeIntent';
  },
  handle(handlerInput) {
    const session = getSessionAttr(handlerInput);
    const mealType = session.mealType || 'breakfast';
    const recipeList = buildRecipeList(mealType, []);
    const choiceSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'recipeChoice') || '';
    const recipe = findRecipeByInput(choiceSlot, recipeList);
    if (!recipe) {
      const speakOutput = `I didn't catch that. ${formatRecipeOptions(recipeList)}`;
      return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    }
    const ingredientsList = formatIngredients(recipe);
    const speakOutput = `Excellent choice! Let's make ${recipe.name}. You'll need: ${ingredientsList}. Ready for the steps?`;
    const reprompt = 'Just say yes when you\'re ready for the steps, or ask me to repeat the ingredients.';
    setSessionAttr(handlerInput, {
      ...session,
      currentRecipe: recipe.name,
      currentStep: 0,
      lastSpeech: speakOutput
    });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .getResponse();
  }
};
// ─── Start Steps / Yes Handler ────────────────────────────────────────────────
const YesIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    const session = getSessionAttr(handlerInput);
    const recipeName = session.currentRecipe;
    if (!recipeName) {
      return handlerInput.responseBuilder
        .speak("Sure! What meal would you like to make? Breakfast, lunch, dinner, or a snack?")
        .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
        .getResponse();
    }
    const mealType = session.mealType || 'breakfast';
    const allRecipes = Object.values(MEAL_RECIPES[mealType] || RECIPES);
    const recipe = allRecipes.find(r => r.name === recipeName);
    if (!recipe) {
      return handlerInput.responseBuilder
        .speak("I couldn't find that recipe. Would you like to start over?")
        .reprompt("Would you like to choose a meal type?")
        .getResponse();
    }
    const stepIndex = session.currentStep || 0;
    if (stepIndex >= recipe.steps.length) {
      const speakOutput = `Enjoy your ${recipe.name}! Would you like another recipe?`;
      setSessionAttr(handlerInput, { ...session, currentStep: 0, currentRecipe: null });
      return handlerInput.responseBuilder.speak(speakOutput).reprompt("Would you like another recipe?").getResponse();
    }
    const step = recipe.steps[stepIndex];
    const stepNum = stepIndex + 1;
    const isLast = stepIndex === recipe.steps.length - 1;
    let speakOutput;
    if (stepIndex === 0) {
      speakOutput = `Great! Here is step ${stepNum}. ${step} ${isLast ? '' : 'Ready for step ' + (stepNum + 1) + '?'}`;
    } else {
      speakOutput = `Step ${stepNum}: ${step} ${isLast ? '' : 'Ready for step ' + (stepNum + 1) + '?'}`;
    }
    if (isLast) {
      speakOutput += ` Would you like me to repeat any steps, or would you like another recipe?`;
    }
    setSessionAttr(handlerInput, { ...session, currentStep: stepIndex + 1, lastSpeech: speakOutput });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(isLast ? "Would you like another recipe?" : `Say yes for step ${stepNum + 1}, or ask me to repeat any step.`)
      .getResponse();
  }
};
// ─── No Intent ────────────────────────────────────────────────────────────────
const NoIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    const speakOutput = "No problem! Would you like to choose a different recipe, or is there anything else I can help you with?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
      .getResponse();
  }
};
// ─── Repeat Last Handler ──────────────────────────────────────────────────────
const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const session = getSessionAttr(handlerInput);
    const last = session.lastSpeech || "I'm not sure what to repeat. What would you like to make?";
    return handlerInput.responseBuilder
      .speak(`Let me repeat that. ${last}`)
      .reprompt(last)
      .getResponse();
  }
};
// ─── Repeat Ingredients Handler ───────────────────────────────────────────────
const RepeatIngredientsIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatIngredientsIntent';
  },
  handle(handlerInput) {
    const session = getSessionAttr(handlerInput);
    const recipeName = session.currentRecipe;
    const mealType = session.mealType || 'breakfast';
    const allRecipes = Object.values(MEAL_RECIPES[mealType] || RECIPES);
    const recipe = allRecipes.find(r => r.name === recipeName);
    if (!recipe) {
      return handlerInput.responseBuilder
        .speak("I'm not sure which recipe you're on. Which meal would you like to make?")
        .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
        .getResponse();
    }
    const ingredientsList = formatIngredients(recipe);
    const speakOutput = `The ingredients for ${recipe.name} are: ${ingredientsList}. Ready to continue with the steps?`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Just say yes to continue with the steps.")
      .getResponse();
  }
};
// ─── Repeat Specific Step Handler ─────────────────────────────────────────────
const RepeatSpecificStepIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatSpecificStepIntent';
  },
  handle(handlerInput) {
    const session = getSessionAttr(handlerInput);
    const recipeName = session.currentRecipe;
    const mealType = session.mealType || 'breakfast';
    const allRecipes = Object.values(MEAL_RECIPES[mealType] || RECIPES);
    const recipe = allRecipes.find(r => r.name === recipeName);
    if (!recipe) {
      return handlerInput.responseBuilder
        .speak("I'm not sure which recipe you're on. Which meal would you like to make?")
        .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
        .getResponse();
    }
    const stepSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'stepNumber');
    const stepNum = parseInt(stepSlot, 10);
    if (isNaN(stepNum) || stepNum < 1 || stepNum > recipe.steps.length) {
      return handlerInput.responseBuilder
        .speak(`This recipe has ${recipe.steps.length} steps. Which step number would you like me to repeat?`)
        .reprompt(`Which step would you like? This recipe has ${recipe.steps.length} steps.`)
        .getResponse();
    }
    const step = recipe.steps[stepNum - 1];
    const speakOutput = `Sure! Step ${stepNum} is: ${step}. Ready to continue?`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say yes to continue, or tell me another step number.")
      .getResponse();
  }
};
// ─── Go Back Handler ──────────────────────────────────────────────────────────
const GoBackIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoBackIntent';
  },
  handle(handlerInput) {
    const session = getSessionAttr(handlerInput);
    const recipeName = session.currentRecipe;
    const mealType = session.mealType || 'breakfast';
    const allRecipes = Object.values(MEAL_RECIPES[mealType] || RECIPES);
    const recipe = allRecipes.find(r => r.name === recipeName);
    if (!recipe) {
      return handlerInput.responseBuilder
        .speak("I'm not sure which recipe you're on. What would you like to make?")
        .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
        .getResponse();
    }
    const currentStep = session.currentStep || 1;
    const prevStepIndex = Math.max(currentStep - 2, 0);
    const prevStep = recipe.steps[prevStepIndex];
    const speakOutput = `Going back to the previous step: Step ${prevStepIndex + 1}: ${prevStep}. Ready to continue?`;
    setSessionAttr(handlerInput, { ...session, currentStep: prevStepIndex });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say yes to continue, or ask me to repeat the step.")
      .getResponse();
  }
};
// ─── Set Dietary Preference Handler ──────────────────────────────────────────
// Handles: SetDietaryPreferenceIntent (slot: dietaryPref)
// Example utterances: "I don't eat eggs", "I'm vegetarian", "no eggs for me"
const SetDietaryPreferenceIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SetDietaryPreferenceIntent';
  },
  async handle(handlerInput) {
    const prefSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'dietaryPref') || '';
    const lower = prefSlot.toLowerCase();
    let prefKey = null;
    let confirmMsg = '';
    if (lower.includes('egg')) {
      prefKey = 'no_eggs';
      confirmMsg = "Got it! I'll remember you don't eat eggs and won't suggest egg recipes.";
    } else if (lower.includes('vegetarian')) {
      prefKey = 'vegetarian';
      confirmMsg = "Perfect! I'll keep your vegetarian preference in mind for all future suggestions.";
    } else {
      return handlerInput.responseBuilder
        .speak("I noted your preference. I currently support vegetarian and no-egg preferences. What meal would you like to make?")
        .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
        .getResponse();
    }
    const persistent = await getPersistentAttr(handlerInput);
    const prefs = persistent.dietaryPrefs || [];
    if (!prefs.includes(prefKey)) prefs.push(prefKey);
    await savePersistentAttr(handlerInput, { ...persistent, dietaryPrefs: prefs });
    return handlerInput.responseBuilder
      .speak(`${confirmMsg} What meal would you like to make?`)
      .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
      .getResponse();
  }
};
// ─── Change Recipe Handler ────────────────────────────────────────────────────
// Triggered when user says "give me something else" or "different recipe"
const ChangeRecipeIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChangeRecipeIntent';
  },
  async handle(handlerInput) {
    const session = getSessionAttr(handlerInput);
    const mealType = session.mealType || 'breakfast';
    const persistent = await getPersistentAttr(handlerInput);
    const dietaryPrefs = persistent.dietaryPrefs || [];
    const recipeList = buildRecipeList(mealType, dietaryPrefs).filter(r => r.name !== session.currentRecipe);
    if (recipeList.length === 0) {
      return handlerInput.responseBuilder
        .speak("I'm afraid I don't have any other recipes for that meal matching your preferences. Would you like to try a different meal?")
        .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
        .getResponse();
    }
    const alts = recipeList.slice(0, 3);
    const altNames = alts.map((r, i) => `Option ${i + 1}: ${r.name}`).join('. ');
    const speakOutput = `No problem! Would you like to try ${altNames}? Say the number or name.`;
    setSessionAttr(handlerInput, { ...session, currentRecipe: null, currentStep: 0, lastSpeech: speakOutput });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Which one would you like?")
      .getResponse();
  }
};
// ─── Help Handler ─────────────────────────────────────────────────────────────
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Hi! I'm Marina. I can help you make quick 5-minute recipes for breakfast, lunch, dinner, or snacks. Just tell me which meal you want, and I'll give you options. You can also ask me to repeat ingredients, repeat steps, or go back to a previous step. So, would you like to hear a breakfast, lunch, dinner, or snack recipe?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Would you like to hear a breakfast, lunch, dinner, or snack recipe?")
      .getResponse();
  }
};
// ─── Cancel & Stop Handlers ───────────────────────────────────────────────────
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Happy cooking! Goodbye from Marina and 5 Minute Recipes!")
      .getResponse();
  }
};
// ─── Session Ended ────────────────────────────────────────────────────────────
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  }
};
// ─── Fallback Handler ─────────────────────────────────────────────────────────
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Sorry, I didn't get that. You can say breakfast, lunch, dinner, or snack to get a recipe. Or say help for more options.")
      .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
      .getResponse();
  }
};
// ─── Error Handler ────────────────────────────────────────────────────────────
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`Error: ${error.message}`);
    return handlerInput.responseBuilder
      .speak("Sorry, I had trouble doing that. Please try again or say help.")
      .reprompt("Would you like breakfast, lunch, dinner, or a snack?")
      .getResponse();
  }
};
// ─── Skill Builder ────────────────────────────────────────────────────────────
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ChooseMealIntentHandler,
    ChooseRecipeIntentHandler,
    YesIntentHandler,
    NoIntentHandler,
    RepeatIntentHandler,
    RepeatIngredientsIntentHandler,
    RepeatSpecificStepIntentHandler,
    GoBackIntentHandler,
    SetDietaryPreferenceIntentHandler,
    ChangeRecipeIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    FallbackIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
/*
═══════════════════════════════════════════════════════════════
 INTERACTION MODEL — Intents to add in the Alexa Developer Console
 (Build → Interaction Model → Intents)
═══════════════════════════════════════════════════════════════
1. ChooseMealIntent
   Slot: meal (AMAZON.Food or custom list: breakfast, lunch, dinner, snack)
   Sample utterances:
     - breakfast
     - give me a breakfast recipe
     - I want breakfast
     - what's for breakfast
     - breakfast recipe
     - tell me a breakfast recipe
     - recommend me a breakfast recipe
     - lunch
     - dinner
     - snack
     - {meal}
     - give me a {meal} recipe
     - I want {meal}
     - I'd like something for {meal}
2. ChooseRecipeIntent
   Slot: recipeChoice (AMAZON.SearchQuery)
   Sample utterances:
     - {recipeChoice}
     - option {recipeChoice}
     - the {recipeChoice} one
     - I want {recipeChoice}
     - let's make {recipeChoice}
     - I'd like {recipeChoice}
3. RepeatIngredientsIntent
   Sample utterances:
     - repeat the ingredients
     - what are the ingredients
     - what do I need
     - list the ingredients again
     - ingredients
     - what were the ingredients
4. RepeatSpecificStepIntent
   Slot: stepNumber (AMAZON.NUMBER)
   Sample utterances:
     - repeat step {stepNumber}
     - tell me step {stepNumber} again
     - step {stepNumber} again
     - what's step {stepNumber}
     - go back to step {stepNumber}
5. GoBackIntent
   Sample utterances:
     - go back
     - previous step
     - back up
     - last step
6. SetDietaryPreferenceIntent
   Slot: dietaryPref (AMAZON.SearchQuery)
   Sample utterances:
     - I don't eat {dietaryPref}
     - I'm {dietaryPref}
     - no {dietaryPref} for me
     - I have a {dietaryPref} preference
     - I am {dietaryPref}
     - {dietaryPref}
7. ChangeRecipeIntent
   Sample utterances:
     - give me something else
     - actually no give me something else
     - different recipe
     - I want a different one
     - change the recipe
     - try a different option
     - what else do you have
═══════════════════════════════════════════════════════════════
*/
