pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ERC20PermitContract is ERC20, ERC20Permit {
	constructor() ERC20("Tony", "ToT") ERC20Permit("Tony") {
		_mint(_msgSender(), 10000 ether);
	}
}
