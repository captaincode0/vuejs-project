/**
 * PROJECT DEPENDENCIES
 */
const Vue = require("vue");

/**
 * BUILT-IN DEPENDENCIES
 */
import "./app.scss";

const app = new Vue({
	el: "#app"
});

const app = new Vue({
	el: "#app",
	template: [
		'<div class="view">',
			'<game-header></game-header>',
			'<game-add @new="addNewGame"></game-add>',
			'<game-list v-bind:games="games"></game-list>',
		'</div>'
	].join(''),
	data: {
		games: [
			{title: "Andromeda"},
			{title: "Call Of Duty Black Ops"},
			{title: "League of Legends"}
		]
	},
	methods: {
		addNewGame: function(game){
			this.games.push(game);
		}
	}
});

Vue.component("game-header", {
	template: "<h1>Video Games</h1>"
});

Vue.component("game-add", {
	template: [
		'<div>',
			'<input type="text" v-model="titleGame" />',
			'<button @click="emitNewGame">Añadir</button>',
		'</div>'
	].join(''),
	data: function(){
		return {
			titleGame: null
		}
	},
	methods: {
		emitNewGame: function(){
			if(this.titleGame){
				this.$emmit("new", {title: this.titleGame});
				this.titleGame = null;
			}
		}
	}
});

Vue.component("game-list", {
	props: ["games"],
	template: [
		'<ol>',
			'<game-item v-for="item in games" :game="item" :key="item.id"></game-item>',
		'</ol>'
	].join('')
});

Vue.component("game-item", {
	props:["game"],
	template: '<li>{{ game.title }}</li>'
});
