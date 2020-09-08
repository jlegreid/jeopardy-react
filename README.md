# Jeopardy! - Online Game
> A simple Jeopardy trivia game built in React.js.

[![Netlify Status](https://api.netlify.com/api/v1/badges/27255c25-e79e-46d8-9bc2-c6e1e65b18ac/deploy-status)](https://app.netlify.com/sites/jlegreid-jeopardy/deploys)

This Jeopardy game came about as a result of a coding challenge and a chance to learn React.js. It uses the [JService][jservice-url] API to feed the categories and clues. It is also an excersize in using React functional components and React hooks instead of class components.

It was inspired by the first 1984 Jeopardy Television Game Show set where Alex Trebek first took over as host.
![][jeopardy-set]

![][jeopardy-logo]

## How to play

Install Dependencies

```sh
npm install 
```

Run the game
```sh
npm run build
serve -s build 
```

## Gameplay

![][new-game]

To set up your first round, choose how many categories and how many clues in each category you would like to load. The default is 6 categories with 5 clues in each based on the original TV gameshow.

![][full-game]

After each round is complete, click or tap "New Game" to repopulate the gameboard with all new categories and clues.

![][clue-card]

Good luck, and watch out for the Daily Double!

All bugs can be filed on the [Issues Board][issues-url]



## Release History

* 0.1.0
    * Initial Release
* 0.0.1
    * Work in progress

## Meta

J.Morgna Legreid – [@jlegreid](https://twitter.com/jlegreid) – jmorgan.legreid@gmail.com


## Contributing

1. Fork it (<https://github.com/jlegreid/jeopardy-react/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[jservice-url]: http://jservice.io/
[issues-url]: https://github.com/jlegreid/jeopardy-react/issues
[jeopardy-logo]: public/header-logo.png
[new-game]: public/new-game.png
[full-game]: public/full-game.png
[clue-card]: public/clue-card.png
[jeopardy-set]: public/og-set.png
