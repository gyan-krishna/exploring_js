blank_logo = "blank.png"
cross_logo = "cross.png"
tick_logo  = "check.png"

color = ["rgb(78, 190, 121)", "rgb(212, 85, 85)"];
player_name = ["one", "two"];
current = 0;

matrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

window.onload = function() 
{
    for(let i = 1 ; i <= 9 ; i++)
    {
        //console.log(i);
        document.getElementById("im"+i).src = blank_logo;
    }
    document.getElementById("status").innerHTML = "Player "+player_name[current] +"'s turn!";
    document.getElementById("status").style.color=color[current];
}

function im_click(id)
{
    pos = Number(id[2])-1;
    x = Math.floor(pos/3);
    y = pos%3;

    //console.log(pos+">"+x + " " + y);
    
    if(matrix[x][y] == -1)
        matrix[x][y] = current;
    else
        return;

    if(current == 1)
        document.getElementById(id).src = cross_logo;
    else
        document.getElementById(id).src = tick_logo;
    current = current == 0 ? 1 : 0;

    stat = check_win();
    if(stat == 1 || stat == 0)
    {
        current = current == 0 ? 1 : 0;
        document.getElementById("status").innerHTML = "Player "+player_name[current] +" Won!";
        document.getElementById("anim").src="congo.gif";
        document.getElementById("game-container").style.display="none";
        document.getElementById("gif-box").style.display="block";
        return;
    }
    else if(stat == -2)
    {
        document.getElementById("status").innerHTML = "Its a draw!";
        document.getElementById("anim").src="draw.gif";
        document.getElementById("status").style.color="White";
        document.getElementById("game-container").style.display="none";
        document.getElementById("gif-box").style.display="block";
        return;
    }
    document.getElementById("status").style.color=color[current];
    document.getElementById("status").innerHTML = "Player "+player_name[current] +"'s turn!";
}

function check_win()
{
    for(let i = 0 ; i < 3 ; i++)
    {
        if(matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2])
            return matrix[i][0];
        if(matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i])
            return matrix[0][i];
    }
    if(matrix[0][0] == matrix[1][1] && matrix[1][1] == matrix[2][2])
        return matrix[0][0];
    if(matrix[0][2] == matrix[1][1] && matrix[1][1] == matrix[2][0])
        return matrix[1][1];    

    flag = false;
    for(i = 0 ; i < 3 ; i++)
    {
        for(j = 0 ; j < 3 ; j++)
            if(matrix[i][j] == -1)
                flag = true;
    }
    if(flag == false)
    {
        console.log("draw!");
        return -2;
    }
    return -1;
}

function reset_game()
{
    console.log("reset!");
    current = 0;
    matrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
    for(let i = 1 ; i <= 9 ; i++)
        document.getElementById("im"+i).src = blank_logo;
    document.getElementById("status").innerHTML = "Player "+player_name[current] +"'s turn!";
    document.getElementById("status").style.color=color[current];
    document.getElementById("game-container").style.display="block";
    document.getElementById("gif-box").style.display="none";
}