import { Theme } from './Theme';

/**
 * Validates that provided value of arbitrary origin is a theme and returns it
 * Returns undefined otherwise
 *
 */
export function parseTheme(theme: unknown): Theme | undefined {
    if (theme === 'light' || theme === 'dark') {
        return theme;
    }
    return undefined;
}
