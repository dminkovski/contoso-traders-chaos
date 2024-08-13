import { IRootState } from "app/config/store";

/**
 * Utility function to load the application state from local storage.
 * @returns The parsed state object if it exists, otherwise undefined.
 */
export const loadState = (): Record<string, any> | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from local storage:', err);
    return undefined;
  }
};

/**
 * Utility function to retrieve the value of a specific item from the stored state.
 * @param key - The key of the item to retrieve.
 * @returns The value associated with the provided key, or undefined if the key is not found.
 */
export const getItemValue = (key: string): any => {
  const state = loadState();
  if (state && key in state) {
    return state[key];
  }
  return undefined;
};

/**
 * Utility function to set the value of a specific item in the stored state.
 * @param key - The key of the item to set.
 * @param value - The value to associate with the provided key.
 */
export const setItemValue = (key: string, value: any): void => {
  const state = loadState() || {}; // Load the state, or start with an empty object
  const newState = { ...state, [key]: value }; // Create a new state with the updated key-value pair
  saveStateToSession(newState);
};

/**
 * Utility function to save the application state to local storage.
 * @param state - The state object to save.
 */
const saveStateToSession = (state: IRootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors, as there's nothing to do if saving fails
  }
};