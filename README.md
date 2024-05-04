# Simplified and unified Vue.js i18n

This package implements a pass-through (kudusta in Chewa) mechanism for internationalization (i18n) of components in Vue.js while fixing some oddities of the vue-i18n package.

## TLDR;

Install and use just as you'd use the original package

## Fixes to the original project

The first oddity of the vue-i18n package is that starts in `legacy` mode by default. This is just wrong. Legacy mode should be an option, not the default.

On top of that by default the vue-i18n library spits out a ton of messages of missing keys. This is a nice-to-have but shouldn't pollute the console output by default.

The final nail in the coffin are the scopes. It's insane to have to keep access to the plugin instance to be able to use the `t()` function if it defaults to the local overrides.

You can still override the setting if you want the original behavior or better yet, use the original package instead.
