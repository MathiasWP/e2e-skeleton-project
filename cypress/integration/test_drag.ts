const DRAG_ROUTE = '/drag';

/**
 * https://stackoverflow.com/a/11944765/
 * Return a random element from an array that is
 * different than `last` (as long as the array has > 1 items).
 * Return null if the array is empty.
 */
function getRandomDifferent(arr, last = undefined) {
	if (arr.length === 0) {
		return null;
	} else if (arr.length === 1) {
		return arr[0];
	} else {
		let num = 0;
		do {
			num = Math.floor(Math.random() * arr.length);
		} while (arr[num] === last);
		return arr[num];
	}
}

describe('Drag and drop', () => {
	before(() => {
		cy.visit(DRAG_ROUTE);
	});

	it('no list initially', () => {
		cy.get('.drop-log > p').should('have.length', 0);
	});

	it('drag one item to append to list', () => {
		cy.get('.draggable').first().trigger('mousedown').trigger('dragstart').wait(500);
		cy.get('.drop-zone').trigger('dragover').trigger('drop');
		cy.get('.drop-log > p').should('have.length', 1).first().should('have.text', 'foo was dropped');
	});

	it('drag items randomly', () => {
		cy.get('.draggable').then((draggables) => {
			for (let i = 0; i < 9; i++) {
				cy.wrap(getRandomDifferent(draggables)).trigger('mousedown').trigger('dragstart');
				cy.get('.drop-zone').trigger('dragover').trigger('drop');
			}
			cy.get('.drop-log > p').should('have.length', 10);
		});
	});
});
