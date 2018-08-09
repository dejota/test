(function () {

    var PlayerService = {
        urlApi: "https://raw.githubusercontent.com/dejota/test/master",
        getPlayerTeamId: async function (playerId) {

            let response = await fetch(`${this.urlApi}/player/${playerId}/team.json`);
            let data = await response.json();
            return data;        
        },
        getPlayers: async function (teamId) {
            let response = await fetch(`${this.urlApi}/team/${teamId}/player.json`);
            let data = await response.json();
            return data; 
        }
    };
    
    var PlayerDetailsController = {
        showTeammatesClick: async () => {
            
            var selectBox = document.getElementById('selectTeam'),
                selectValue = selectBox.options[selectBox.selectedIndex].value;
    
            let team = await PlayerService.getPlayerTeamId(selectValue);
    
            let playerList = await PlayerService.getPlayers(team.id);

            PlayerDetailsController.ShowPlayer(playerList, team.id);
        },
        ShowPlayer: function(playerList, teamId) {
            var data = document.getElementById('data');
            var team = document.getElementById('team');
            data.textContent = '';
            team.textContent = teamId;

            playerList.forEach(element => {
                data.textContent += element + ' ';
            });
            
        },
        loadSelect: () => {
            var selectBox = document.getElementById('selectTeam');
            selectBox.addEventListener("change", PlayerDetailsController.showTeammatesClick);
        } 
    };

    PlayerDetailsController.loadSelect();
    
}());

