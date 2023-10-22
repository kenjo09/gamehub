import { Component, Output, EventEmitter } from '@angular/core';

interface IconList {
  icon: string;
  matched: string | boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss'],
})
export class MemoryGameComponent {
  @Output() close = new EventEmitter<boolean>();
  playerXScore: number = 0;
  playerOScore: number = 0;

  playerTurn: string = 'O';
  disableResetButton = true;
  winner: string = '';
  selectedIcons: string[] = [];
  selectedCount: number = 0;
  selectedIconList: IconList[] = [];
  iconList: string[] = [
    'ac_unit',
    'airport_shuttle',
    'all_inclusive',
    'beach_access',
    'business_center',
    'casino',
    'child_care',
    'child_friendly',
    'fitness_center',
    'free_breakfast',
    'golf_course',
    'hot_tub',
    'kitchen',
    'meeting_room',
    'no_meeting_room',
    'pool',
    'room_service',
    'rv_hookup',
    'spa',
    'satellite',
    'store_mall_directory',
    'streetview',
    'subway',
    'terrain',
    'traffic',
    'train',
    'local_parking',
    'local_pharmacy',
    'local_phone',
    'local_pizza',
  ];

  disableClickIcons: boolean = false;

  playerActions = {
    moves: 2,
    icon1: '',
    index1: -1,
    icon2: '',
    index2: -1,
  };

  initializeGame: boolean = false;
  constructor() {}

  initializeMemoryGame(count: number) {
    this.selectedCount = count;
    this.selectedIcons = [];

    while (
      this.selectedIcons.length < this.selectedCount &&
      this.iconList.length > 0
    ) {
      let randomIndex = Math.floor(Math.random() * this.iconList.length);
      let selectedIcon = this.iconList.splice(randomIndex, 1)[0];
      this.selectedIcons.push(selectedIcon);
    }
    this.randomizeIcons();
  }

  randomizeIcons() {
    this.selectedIcons = [...this.selectedIcons, ...this.selectedIcons];
    this.selectedIcons.sort(() => Math.random() - 0.5);
    this.initializeGame = true;
    this.selectedIcons.forEach((icon) => {
      this.selectedIconList.push({ icon: icon, matched: false });
    });

    console.log(this.selectedIconList);
  }

  selectIcon(icon: IconList, index: number) {
    let successMatched = false;
    if (icon.matched) {
      return;
    }

    if (this.playerActions.moves === 2) {
      this.playerActions.icon1 = icon.icon;
      icon.matched = 'viewed';
      this.playerActions.moves = 1;
      this.playerActions.index1 = index;
    }

    if (this.playerActions.moves === 1) {
      this.playerActions.icon2 = icon.icon;
      icon.matched = 'viewed';
      this.playerActions.moves = 0;
      this.playerActions.index2 = index;
    }

    if (this.playerActions.icon1 === this.playerActions.icon2) {
      setTimeout(() => {
        icon.matched = true;
        this.selectedIconList[this.playerActions.index1].matched = true;
        this.playerTurn === 'X' ? this.playerXScore++ : this.playerOScore++;
        successMatched = true;
      }, 300);
    }

    if (this.playerActions.moves === 0) {
      this.disableClickIcons = true;
      setTimeout(() => {
        if (!successMatched) {
          this.selectedIconList[this.playerActions.index1].matched = false;
          this.selectedIconList[this.playerActions.index2].matched = false;
          this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
        }

        this.playerActions.moves = 2;
        this.playerActions.icon1 = '';
        this.playerActions.icon2 = '';
        this.playerActions.index1 = -1;
        this.playerActions.index2 = -1;
        this.disableClickIcons = false;
      }, 1000);
    }
  }
  resetGame() {}
}
