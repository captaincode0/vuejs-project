<template>
	<ul class="game-list">
		<game-item 
			v-for="item in games"
			:game="item"
		></game-item> 
	</ul>
</template>