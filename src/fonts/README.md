# Schnyder S font assets

Schnyder S is a commercial font from Commercial Type. Make sure your team has a
licensed copy before adding the files to this project.

## Required files

- `SchnyderS-Demi.woff2`

## Fallback behavior

The app loads Schnyder S with a Georgia fallback. If the font file is missing or
fails to load, the UI will render using `Georgia`, then the generic `serif`
stack defined in the font configuration.

## Git ignore note

Add `*.woff2` to `.gitignore` so commercial font files are never committed.
