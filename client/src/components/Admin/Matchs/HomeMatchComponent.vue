<script setup>
import {adminStore} from "../../../stores/Admin/admin";
import {adminMatchStore} from "../../../stores/Admin/adminMatch";

// stores
const admin = adminStore();
const adminMatch = adminMatchStore();

// variables
var days = [];
var days_complete = [];
var days_week = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
var today = new Date();
var hours_play = [
  { 
    hour_start: "9:00",
    hour_finish: "10:00" 
  },
  { 
    hour_start: "10:00",
    hour_finish: "11:00" 
  },
  { 
    hour_start: "11:00",
    hour_finish: "12:00" 
  },
  { 
    hour_start: "12:00",
    hour_finish: "13:00" 
  },
  { 
    hour_start: "13:00",
    hour_finish: "14:00" 
  },
  { 
    hour_start: "14:00",
    hour_finish: "15:00" 
  },
  { 
    hour_start: "15:00",
    hour_finish: "16:00" 
  },
  { 
    hour_start: "16:00",
    hour_finish: "17:00" 
  },
  { 
    hour_start: "17:00",
    hour_finish: "18:00" 
  },
  { 
    hour_start: "18:00",
    hour_finish: "19:00" 
  },
  { 
    hour_start: "19:00",
    hour_finish: "20:00" 
  },
  { 
    hour_start: "20:00",
    hour_finish: "21:00" 
  },
  { 
    hour_start: "21:00",
    hour_finish: "22:00" 
  },
  { 
    hour_start: "22:00",
    hour_finish: "23:00" 
  }
];
var courts = [1,2,3]

// functions

function getNextSevenDays() {
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const month = nextDay.getMonth() + 1;
    const date = nextDay.getDate();
    const dateString = `${date < 10 ? "0" + date : date}/${
        month < 10 ? "0" + month : month
    }/${nextDay.getFullYear()}`;
    days.push(dateString);
    days_complete.push({
      day: days_week[nextDay.getDay()],
      number: nextDay.getDate(),
      date: dateString
    });
  }
}

function setTable(court, day, hour) {
  let result = [];
  for (let i = 0; i < adminMatch.all_matchs.length; i++) {
    if (
      adminMatch.all_matchs[i].court == court &&
      adminMatch.all_matchs[i].date == day &&
      adminMatch.all_matchs[i].hour == hour
    ) {
      adminMatch.all_matchs[i].edit = true;
      result.push(adminMatch.all_matchs[i]);
    }
  }
  if(result.length == 0) {
    result.push({
      players: [
        {
          name: "+"
        }
      ]
    })
  }
  return result;
}

function addPreparerMatch(day, hour, court) {
  var match = {
    date: day.date,
    hour: hour.hour_start,
    court: court,
  }

  adminMatch.addMatch(match, days[0], days[6]);
}

function viewMatch(e, day, hour, court, id){
  e.stopPropagation()
  if(e.target.innerHTML == "+") {
    addPreparerMatch(day, hour, court)
  }else{
    console.log('ver ' + id)
    adminMatch.viewMatch(match);
  }
}

function editMatch(e, id){
  e.stopPropagation()
  admin.changeProps(id);
  admin.changeSubcomponent("edit");
}

function deleteMatch(e, id){
  e.stopPropagation()
  adminMatch.deleteMatch(id, days[0], days[6]);
}


getNextSevenDays();

adminMatch.getAllWeekMatchs(days[0], days[6]);
</script>


<template>
  <div class="global-container">
    <div class="container-matchs">
      <h3 class="add-match" v-on:click="admin.changeSubcomponent('add')">Añadir partido</h3>
      <div class="container-day">
        <table v-for="day of days_complete">
          <thead>
            <h3 :key="day.day">{{ day.day + ' ' + day.number}}</h3>
            <tr>
              <th>Hora</th>
              <th v-for="court of courts">
                  <td :key="court">Pista {{ court }}</td>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hour of hours_play">
              <td>{{ hour.hour_start + ' - ' + hour.hour_finish}}</td>
              <td :key="{day:day, hour:hour, court:1}" v-for="result of setTable(1,day.number,hour.hour_start)">
                <div class="container-players">
                  <div class="players" v-on:click="viewMatch($event, day, hour, 1, result.id)">
                    <label v-for="player of result.players">
                      {{ player.name ? player.name : 'sin definir ' }}
                    </label>
                  </div>
                  <div class="options">
                    <label v-if="result.edit" v-on:click="editMatch($event ,result.id)" for="">editar</label>
                    <label v-if="result.edit" v-on:click="deleteMatch($event ,result.id)" for="">borrar</label>
                  </div>
                </div>
              </td>
              <td :key="{day:day, hour:hour, court:2}" v-for="result of setTable(2,day.number,hour.hour_start)">
                <div class="container-players">
                  <div class="players" v-on:click="viewMatch($event, day, hour, 2, result.id)">
                    <label v-for="player of result.players">
                      {{ player.name ? player.name : 'sin definir ' }}
                    </label>
                  </div>
                  <div class="options">
                    <label v-if="result.edit" v-on:click="editMatch($event ,result.id)" for="">editar</label>
                    <label v-if="result.edit" v-on:click="deleteMatch($event ,result.id)" for="">borrar</label>
                  </div>
                </div>
              </td>
              <td :key="{day:day, hour:hour, court:3}" v-for="result of setTable(3,day.number,hour.hour_start)">
                <div class="container-players">
                  <div class="players" v-on:click="viewMatch($event, day, hour, 3, result.id)">
                    <label v-for="player of result.players">
                      {{ player.name ? player.name : 'sin definir ' }}
                    </label>
                  </div>
                  <div class="options">
                    <label v-if="result.edit" v-on:click="editMatch($event ,result.id)" for="">editar</label>
                    <label v-if="result.edit" v-on:click="deleteMatch($event ,result.id)" for="">borrar</label>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>


<style lang="scss">
@import '../../../assets/styles.scss';


.global-container{
  // size
  width: 100%;

  // display
  @include flexbox();

  .container-matchs {
    // size
    width: 70%;

    // display
    @include flexbox(column, center, center);
    
    .add-match {
      // size
      width: 100%;
      height: 50px;

      // decoration
      text-align: center;
      cursor: pointer;
    }

    .container-day {
      // size
      width: 100%;

      // display
      @include flexbox(column, center, center);

      table {
        // size
        width: 100%;

        // decoration
        border-collapse: collapse;
        border: 1px solid $h-c-black;

        th {
          border: 1px solid black;

          // margin
          padding: 10px;

          // decoration
          font-size: 1.2rem;
          text-align: center;
        }

        td {
          border: 1px solid black;
          padding: 10px;
          background-color: $h-c-white;
          color: $h-c-black;
          font-size: 1rem;
          text-align: center;
        }

        .container-players {
          // display
          @include flexbox();
          
          .players{
            // size
            width: 80%;

            // display
            @include grid(2, 2);
            grid-auto-rows: auto;

            label {
              // decoration
              text-align: center;
              cursor: pointer;
              overflow: hidden;
            }
          }

          .options {
            // size
            width: 20%;

            // display
            @include flexbox(column, center, center);

            label {
              // size
              width: 100%;
              height: 50%;

              // decoration
              text-align: center;
              cursor: pointer;
            }
          } 
        }
      }
    }
  }
}
</style>