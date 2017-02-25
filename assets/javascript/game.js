
var currentGameTotal = 0;
var gameInPlay = false;
var gamePlayer = {playerName: ' ',
					    		currentScore: 0,
					    		gamesWon: 0,
									gamesLost: 0,
					    		addToScore: function (score)
														{
															currentScore = currentScore + score;
														}
						 };

// Display the screen
// Initialize Game info
function setUpGameArea()
{

}

// Initialize any player specific info
function setUpPlayer()
{	
	$("#cr-player-name-1").html(gamePlayer.playerName);
	return gamePlayer;
}

function generateNewNumberCode()
{
	return Math.floor(Math.random() * 101)+19;
}

function generateCrystalKeys(currentCode)
{
	
	var keys = [];
	for (i=0; i<4; i++)
	{
		keys[i] = Math.floor(Math.random() * 11)+1;
		console.log(keys[i]);
	}
	return keys;
}

function refreshScreen(screenRefreshData)
	{
		var keyValue;
		for (i=0; i<screenRefreshData.crystalKeys.length; i++)
			{
				keyValue = screenRefreshData.crystalKeys[i];
				$("#cr-key-id"+i).attr("crystalvalue", keyValue); 
			}
		$("#cr-player-score").html(screenRefreshData.playerWinScore);	
		$("#cr-player-losses").html(screenRefreshData.playerLostScore);	
		$("#cr-target-number").html(screenRefreshData.numberCode);
		$("#cr-collected-crystal").html(currentGameTotal);
	}

	
function playerRoundEnds(playerWonRound)
{
	if (playerWonRound) 
	{
		gamePlayer.gamesWon++;		
	}
	else
	{
		gamePlayer.gamesLost++;	
	}
  //gameInPlay = false;
	currentGameTotal = 0;
  play(player);
}
function continuePlay()
{
	
}

// add cliked enent handler to all buttons with the class "crystal-class"
function ativateCrystal()
	{
		
		$(".crystal-class" ).click(function() 
			
			{ 			
				var currentCrystalValue = $("#cr-target-number").html();
				if (gameInPlay)
				{
				
					var crystalValue = $(this).attr("crystalvalue") ;
					currentGameTotal = Number(currentGameTotal) + Number(crystalValue);
					$("#cr-collected-crystal").html(currentGameTotal);
					
					if (currentGameTotal < currentCrystalValue )
					{
						continuePlay();
					}
					else if (currentGameTotal == currentCrystalValue ) 
					{
						playerRoundEnds(true);
					}
					else
					{
						playerRoundEnds(false);
					}
				}  
			});
	}



function play(player)
  {
  var screenRefreshData = {numberCode: 0, 
                           crystalKeys: [],
											     playerWinScore: player.gamesWon,
											     playerLostScore: player.gamesLost
													};
											
  screenRefreshData.numberCode =  generateNewNumberCode();
  screenRefreshData.crystalKeys = generateCrystalKeys(screenRefreshData.numberCode);
  refreshScreen(screenRefreshData);
  gameInPlay =true;
	ativateCrystal();
  }

function startGame()
  {
  setUpGameArea();
  player = setUpPlayer();
  play(player);
  }