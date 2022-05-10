<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">

    type TDraggableItem = {
        id: number
        name: string
    }

    const draggableItems = [
        {
            id: 1,
            name: 'foo',
        },
        {
            id: 2,
            name: 'bar',
        },
    ]

    let droppedItems: TDraggableItem[] = []

    let currentItemBeingDragged: null | TDraggableItem = null
    let draggingOverDropZone = false;
    
    function onDrop() {
        if(currentItemBeingDragged) {
            droppedItems = [...droppedItems, currentItemBeingDragged]
        }
    }

    function onDragStart(item: TDraggableItem) {
        currentItemBeingDragged = item
    }

    function onDragEnd() {
        currentItemBeingDragged = null
    }

    function onDragOver() {
        draggingOverDropZone = true
    }

    function onDragLeave() {
        draggingOverDropZone = false
    }
</script>

<svelte:head>
	<title>Drag</title>
</svelte:head>

<section>
    {#each draggableItems as item (item.id)}
        <div class="draggable" draggable="true" on:dragstart={() => onDragStart(item)} on:dragend={onDragEnd}>
            I am {item.name}
        </div>
    {/each}
</section>
<section class="drop-zone" class:active={draggingOverDropZone} on:dragover|preventDefault={onDragOver}  on:dragleave={onDragLeave} on:drop|stopPropagation={onDrop}>
    Drop zone!
</section>
<section class="drop-log">
    Dropped items log:

    {#each droppedItems as item, i (i)}
        <p>{item.name} was dropped</p>
    {/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

    .draggable {
        cursor: grab;
        padding: 2rem;
        background-color: rgb(255, 255, 255);
        border: 1px solid black;
    }

    .drop-zone {
        margin-top: 2rem;
        padding: 10rem;
        border: 2px solid orange;
    }

    .drop-zone.active {
        background-color: aliceblue;
    }

    .drop-log {
        margin-top: 2rem;
        font-weight: bold;
    }

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
