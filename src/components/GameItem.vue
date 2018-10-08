<template>
	<li class="game-item">{{ game.title }}</li>
</template>

<script>
	export default {
		props(){
			game: Game
		}
	}
</script>