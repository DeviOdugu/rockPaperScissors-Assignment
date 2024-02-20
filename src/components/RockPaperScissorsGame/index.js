import {Component} from 'react'
import Popup from 'reactjs-popup'
import {
  Container,
  Card,
  Container1,
  RockImage,
  ScissorImage,
  PaperImage,
  PopupContainer,
  RulesImage,
  CloseIcon,
  RulesButton,
  Container2,
  CardContainer,
  ScoreCard,
  DivContainer,
  Score,
  Image1,
  Image2,
  ResultContainer,
  ImageContainer,
  Text1,
  Text2,
  ResultText,
  ResultButton,
  Button,
} from './styledComponents'

class RockPaperScissorsGame extends Component {
  state = {
    count: 0,
    resultText: '',
    yourChoice: '',
    opponentChoice: '',
    displayResult: false,
  }

  onClickImage = imageId => {
    // console.log(imageId)

    const {choicesList} = this.props
    const {count} = this.state

    const randomNumber = Math.floor(Math.random() * choicesList.length)
    const opponentChoiceImage = choicesList[randomNumber].imageUrl
    const opponentId = choicesList[randomNumber].id
    // console.log(opponentId)
    // console.log(opponentChoiceImage)

    const yourChoiceImage = choicesList.filter(
      eachChoice => eachChoice.id === imageId,
    )[0].imageUrl
    // console.log(yourChoiceImage)

    if (imageId === opponentId) {
      this.setState({
        resultText: 'IT IS DRAW',
      })
    } else if (
      (imageId === 'PAPER' && opponentId === 'ROCK') ||
      (imageId === 'SCISSORS' && opponentId === 'PAPER') ||
      (imageId === 'ROCK' && opponentId === 'SCISSORS')
    ) {
      this.setState({
        resultText: 'YOU WON',
        count: count + 1,
      })
    } else if (
      (imageId === 'SCISSORS' && opponentId === 'ROCK') ||
      (imageId === 'ROCK' && opponentId === 'PAPER') ||
      (imageId === 'PAPER' && opponentId === 'SCISSORS')
    ) {
      this.setState({resultText: 'YOU LOSE', count: count - 1})
    }
    this.setState({
      yourChoice: yourChoiceImage,
      opponentChoice: opponentChoiceImage,
      displayResult: true,
    })
  }

  onClickPlayAgainButton = () => {
    this.setState({displayResult: false})
  }

  render() {
    const {choicesList} = this.props
    const {
      count,
      resultText,
      yourChoice,
      opponentChoice,
      displayResult,
    } = this.state
    return (
      <Container>
        <Card>
          <CardContainer>
            <DivContainer>
              <h1>
                ROCK
                <br />
                PAPER
                <br />
                SCISSORS
              </h1>
            </DivContainer>
            <ScoreCard>
              <p>Score</p>
              <Score>{count}</Score>
            </ScoreCard>
          </CardContainer>
        </Card>
        {!displayResult && (
          <>
            <Container1>
              <Button
                tytpe="button"
                data-testid="rockButton"
                onClick={() => this.onClickImage(choicesList[0].id)}
              >
                <RockImage
                  src={choicesList[0].imageUrl}
                  alt={choicesList[0].id}
                />
              </Button>
              <Button
                type="button"
                data-testid="scissorsButton"
                onClick={() => this.onClickImage(choicesList[1].id)}
              >
                <ScissorImage
                  src={choicesList[1].imageUrl}
                  alt={choicesList[1].id}
                />
              </Button>
            </Container1>
            <Container1>
              <Button
                type="button"
                data-testid="paperButton"
                onClick={() => this.onClickImage(choicesList[2].id)}
              >
                <PaperImage
                  src={choicesList[2].imageUrl}
                  alt={choicesList[2].id}
                />
              </Button>
            </Container1>
          </>
        )}
        {displayResult && (
          <ResultContainer>
            <ImageContainer>
              <div>
                <Text1>YOU</Text1>
                <Image1 src={yourChoice} alt="your choice" />
              </div>
              <div>
                <Text2>OPPONENT</Text2>
                <Image2 src={opponentChoice} alt="opponent choice" />
              </div>
            </ImageContainer>
            <ResultText>{resultText}</ResultText>
            <ResultButton type="button" onClick={this.onClickPlayAgainButton}>
              PLAY AGAIN
            </ResultButton>
          </ResultContainer>
        )}
        <Popup
          modal
          trigger={
            <Container2>
              <RulesButton type="button">RULES</RulesButton>
            </Container2>
          }
        >
          {close => (
            <PopupContainer>
              <RulesImage
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                height="250px"
                width="300px"
              />
              <CloseIcon onClick={() => close()} />
            </PopupContainer>
          )}
        </Popup>
      </Container>
    )
  }
}

export default RockPaperScissorsGame
