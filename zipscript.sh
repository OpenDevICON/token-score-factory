#! /bin/bash

# IRC2 Zips
zip -r zips/basic_irc2.zip basic_irc2 -x "basic_irc2/tests/*"
zip -r zips/mintable_irc2.zip mintable_irc2 -x "mintable_irc2/tests/*"
zip -r zips/burnable_irc2.zip burnable_irc2 -x "burnable_irc2/tests/*"
zip -r zips/pausable_irc2.zip pausable_irc2 -x "pausable_irc2/tests/*"
zip -r zips/burnpause_irc2.zip burnpause_irc2 -x "burnpause_irc2/tests/*"
zip -r zips/mintpause_irc2.zip mintpause_irc2 -x "mintpause_irc2/tests/*"
zip -r zips/mintburn_irc2.zip mintburn_irc2 -x "mintburn_irc2/tests/*"
zip -r zips/mintburnpause_irc2.zip mintburnpause_irc2 -x "mintburnpause_irc2/tests/*"
zip -r zips/complete_irc2.zip complete_irc2 -x "complete_irc2/tests/*"
zip -r zips/stablecoin.zip stablecoin -x "stablecoin/tests/*"

# IRC3 Zips
zip -r zips/mintable_irc3.zip mintable_irc3 -x "mintable_irc3/tests/*"
zip -r zips/burnable_irc3.zip burnable_irc3 -x "burnable_irc3/tests/*"
zip -r zips/owner_mintable_irc3.zip owner_mintable_irc3 -x "owner_mintable_irc3/tests/*"
zip -r zips/owner_burnable_irc3.zip owner_burnable_irc3 -x "owner_burnable_irc3/tests/*"