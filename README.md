<img src="https://pgn.mitkostatev.com/other/logo.png" width="60"/> 

# PGN Player (Viewer)

## Description

A web application for chess players. PGN Player is a viewer that allows viewing chess games by loading their text notation. Chess game data should be loaded either in PGN file format (standard) or as a plain text. (work in progress...)

## Table of Contents

[Features](#features)<br/>
[Technologies Used](#technologies-used)<br/>
[Libraries Used](#libraries-used)<br/>
[Usage](#usage)<br/>
[Contact](#contact)

## Features

- SPA
- responsive design ("mobile first")
- loading PGN file or PGN formatted text
- color themes: light & dark
- settings
- customizable chessboard (work in progress...)
- Info bar (tags loaded)
- Status bar, showing errors
- save chess game notation in PGN file format (work in progress...)

## Technologies Used

**Languages**: TypeScript, Sass, HTML<br/>
**Frameworks/Libraries**: React<br/>
**Other Tools**: Git, VSCode, Photoshop

## Libraries Used

### React 18.3
* Redux 9.1
* Sass 1.80
* Font Awesome 6
* Dotenv 16.4
* Vite 5.4

## Usage 

The user can load a PGN file or a PGN formatted text directly in the input field.
Loading functions format data, while searching for errors. If found, the errors are indicated on the status panel. Otherwise they return OK message and allow the user to view all the moves of the game loaded. Additional information tags (players, ELO,  result, date, site, etc.) are displayed, if found. User can navigate using the control panel: go forward/backward, clear game notation, load another game. 
Settings (in the menu) allows to customize the player's interface (change chessboard, pieces, show/hide square notation, etc.)

**Desktop Version**<br/>
<img src="https://pgn.mitkostatev.com/other/pgn-player-home-desktop.png" width="760"/>

## Contact

Dimitar Statev<br/>
Email: &nbsp;  statevd@gmail.com<br/>
GitHub: &nbsp;  https://github.com/mstat777<br/>
LinkedIn: &nbsp;  https://www.linkedin.com/in/dimitar-statev/