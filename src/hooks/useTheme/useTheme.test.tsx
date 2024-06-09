import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';

import { defaultTheme } from '@/theme/defaultTheme';
import { Theme } from '@/types/Theme';

import { useTheme, cn, filterClasses } from './useTheme';

describe('useTheme hook', () => {
  test('should return the default theme', () => {
    const { result } = renderHook(() => useTheme({}));

    expect(result.current.currentTheme).toEqual(defaultTheme);
  });

  test('should update button classes', () => {
    const newButtonClasses = 'new-button-class';
    const { result } = renderHook(() =>
      useTheme({
        buttonClasses: newButtonClasses
      })
    );

    expect(result.current.currentTheme.button.classes).toContain(
      newButtonClasses
    );
  });

  test('should update container classes and filter opposites', () => {
    const newContainerClasses = 'new-container-class left-0';
    const { result } = renderHook(() =>
      useTheme({
        containerClasses: newContainerClasses
      })
    );

    // Bring in functionality from hook to test equality
    const temp = { ...defaultTheme };
    temp.container.classes = cn(temp.container.classes, newContainerClasses);
    const values = newContainerClasses
      .split(' ')
      .map((value) => value.split('-')[0] || '');
    temp.container.classes = filterClasses(values, temp.container.classes);

    const { classes: resultClasses } = result.current.currentTheme.container;

    expect(resultClasses).toContain('new-container-class');
    expect(resultClasses).not.toContain('right-0');
  });

  test('should update icon classes', () => {
    const newIconClasses: Theme['icon']['classes'] = {
      info: {
        altText: 'new-info-alt-text',
        classes: 'new-info-class'
      },
      success: {
        altText: 'new-success-alt-text',
        classes: 'new-success-class'
      }
    };
    const { result } = renderHook(() =>
      useTheme({
        iconClasses: newIconClasses
      })
    );

    Object.keys(newIconClasses).forEach((key) => {
      expect(result.current.currentTheme.icon.classes[key].classes).toContain(
        newIconClasses[key].classes
      );
      expect(result.current.currentTheme.icon.classes[key].altText).toBe(
        newIconClasses[key].altText
      );
    });
  });

  test('should update layout classes', () => {
    const newLayoutClasses = 'new-layout-class';
    const { result } = renderHook(() =>
      useTheme({
        layoutClasses: newLayoutClasses
      })
    );

    expect(result.current.currentTheme.layout.classes).toContain(
      newLayoutClasses
    );
  });

  test('should update message classes', () => {
    const newMessageClasses = 'new-message-class';
    const { result } = renderHook(() =>
      useTheme({
        messageClasses: newMessageClasses
      })
    );

    expect(result.current.currentTheme.message.classes).toContain(
      newMessageClasses
    );
  });

  test('cn function should merge classes correctly', () => {
    const mergedClasses = cn('class1', 'class2');
    expect(mergedClasses).toBe('class1 class2');
  });

  test('filterClasses should filter out opposite classes', () => {
    const values = ['left'];
    const classString = 'right-0 bottom-0';
    const filteredClasses = filterClasses(values, classString);
    expect(filteredClasses).not.toContain('right-0');
    expect(filteredClasses).toContain('bottom-0');
  });

  test('should handle empty iconClasses correctly', () => {
    const newIconClasses = {
      info: {
        altText: '',
        classes: ''
      }
    };

    const { result } = renderHook(() =>
      useTheme({
        iconClasses: newIconClasses
      })
    );

    const { classes: resultingClasses } =
      result.current.currentTheme.icon.classes.info;
    const { classes: defaultClasses } = defaultTheme.icon.classes.info;
    const { altText } = result.current.currentTheme.icon.classes.info;

    expect(resultingClasses).toBe(defaultClasses);
    expect(altText).toBe('');
  });

  test('should correctly merge class names for buttonClasses', () => {
    const initialButtonClasses = defaultTheme.button.classes;
    const additionalButtonClasses = 'additional-button-class';

    const { result } = renderHook(() =>
      useTheme({
        buttonClasses: additionalButtonClasses
      })
    );

    expect(result.current.currentTheme.button.classes).toContain(
      additionalButtonClasses
    );
    initialButtonClasses.split(' ').forEach((cls) => {
      expect(result.current.currentTheme.button.classes).toContain(cls);
    });
  });

  test('should handle undefined iconClasses correctly', () => {
    const newIconClasses = undefined;
    const { result } = renderHook(() =>
      useTheme({
        iconClasses: newIconClasses
      })
    );

    expect(result.current.currentTheme.icon.classes).toEqual(
      defaultTheme.icon.classes
    );
  });

  test('should correctly merge class names for layoutClasses', () => {
    const initialLayoutClasses = defaultTheme.layout.classes;
    const additionalLayoutClasses = 'additional-layout-class';

    const { result } = renderHook(() =>
      useTheme({
        layoutClasses: additionalLayoutClasses
      })
    );

    expect(result.current.currentTheme.layout.classes).toContain(
      additionalLayoutClasses
    );
    initialLayoutClasses.split(' ').forEach((cls) => {
      expect(result.current.currentTheme.layout.classes).toContain(cls);
    });
  });

  test('should update icon classes with different altText and classes', () => {
    const newIconClasses = {
      warning: {
        altText: 'new-warning-alt-text',
        classes: 'new-warning-class'
      }
    };

    const { result } = renderHook(() =>
      useTheme({
        iconClasses: newIconClasses
      })
    );

    expect(result.current.currentTheme.icon.classes.warning.altText).toBe(
      'new-warning-alt-text'
    );
    expect(result.current.currentTheme.icon.classes.warning.classes).toContain(
      'new-warning-class'
    );
  });

  test('should update icon classes and preserve existing ones', () => {
    const newIconClasses = {
      info: {
        altText: 'updated-info-alt-text',
        classes: 'updated-info-class'
      }
    };

    const { result } = renderHook(() =>
      useTheme({
        iconClasses: newIconClasses
      })
    );

    expect(result.current.currentTheme.icon.classes.info.altText).toBe(
      'updated-info-alt-text'
    );
    expect(result.current.currentTheme.icon.classes.info.classes).toContain(
      'updated-info-class'
    );
  });

  test('should handle iconClasses being partially updated', () => {
    const newIconClasses = {
      info: {
        altText: 'partial-info-alt-text',
        classes: ''
      }
    };

    const { result } = renderHook(() =>
      useTheme({
        iconClasses: newIconClasses
      })
    );

    expect(result.current.currentTheme.icon.classes.info.altText).toBe(
      'partial-info-alt-text'
    );
    expect(result.current.currentTheme.icon.classes.info.classes).toBe(
      defaultTheme.icon.classes.info.classes
    );
  });

  test('should handle empty containerClasses', () => {
    const newContainerClasses = '';
    const { result } = renderHook(() =>
      useTheme({
        containerClasses: newContainerClasses
      })
    );

    expect(result.current.currentTheme.container.classes).toBe(
      defaultTheme.container.classes
    );
  });

  test('should handle empty buttonClasses', () => {
    const newButtonClasses = '';
    const { result } = renderHook(() =>
      useTheme({
        buttonClasses: newButtonClasses
      })
    );

    expect(result.current.currentTheme.button.classes).toBe(
      defaultTheme.button.classes
    );
  });

  test('should handle empty layoutClasses', () => {
    const newLayoutClasses = '';
    const { result } = renderHook(() =>
      useTheme({
        layoutClasses: newLayoutClasses
      })
    );

    expect(result.current.currentTheme.layout.classes).toBe(
      defaultTheme.layout.classes
    );
  });

  test('should handle empty messageClasses', () => {
    const newMessageClasses = '';
    const { result } = renderHook(() =>
      useTheme({
        messageClasses: newMessageClasses
      })
    );

    expect(result.current.currentTheme.message.classes).toBe(
      defaultTheme.message.classes
    );
  });
});
