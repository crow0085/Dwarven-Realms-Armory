const twitch = window.Twitch.ext;
aname = "";
cname = "";
ssf = false;
hc = false;
playerJson = ""; // json to store the player data fetched from the api

// equipment mods
amulet = "";
belt = "";
boots = "";
bracer = "";
goblet = "";
helmet = "";
horn = "";
relic = "";
ring1 = "";
ring2 = "";
trinket = "";
weapon = "";
stance = "";

offhand_elements = {
  fire: ["Burning Shield", "Delusion of Zelkors", "Dragon Flame", "Rain of Flames", "Fire Beam", "Carnage of Fire", "Fiery Totems", "Fire Orbs"],
  lightning: ["Electric Dragons", "Chain Lightning", "Eye of the Storm", "Static Charge", "Star Blades", "Spark", "Ferocity of Wolves", "Lightning Plasma", "Lightning Totems"],
  arcane: []
}

//apiUrl = "https://loadbalancer-prod-1ac6c83-453346156.us-east-1.elb.amazonaws.com:80/leaderboards/scores/?";
//apiUrl = "https://dwarvenleaderboard.com/lbapi/leaderboard.fcgi"
apiUrl = "https://dwarven-realms-armory-backend.onrender.com/status"


twitch.onAuthorized((auth) => {
  console.log('got auth');
});

twitch.configuration.onChanged(async function () {
  if (twitch.configuration.broadcaster) {
    try {
      config = JSON.parse(twitch.configuration.broadcaster.content)
      aname = config[0];
      cname = config[1];
      ssf = config[2];
      hc = config[3];

      console.log("account name: " + aname);
      console.log("character name: " + cname);
      console.log("in fellowship: " + ssf);
      console.log("is hardcore: " + hc);

      FetchPlayerData();

    } catch (e) {
      console.log('invalid config' + e);
    }
  }
})

async function FetchPlayerData() {
  await SetPlayerJson();
  // TODO add check to see if player json was fetched. If not display emtpy UI with reload button
  if (typeof playerJson != 'undefined') {
    console.log(playerJson);
    PopulateUIData();
  } else {
    console.log("couldnt load player")
  }

}


// all the event listeners for hover and clicks
$(document).ready(function () {

  $("#helm").on("mouseover", function () {
    HoveredEqupmentUI(helmet);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#amulet").on("mouseover", function () {
    HoveredEqupmentUI(amulet);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#bracer").on("mouseover", function () {
    HoveredEqupmentUI(bracer);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#relic").on("mouseover", function () {
    HoveredEqupmentUI(relic);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#boots").on("mouseover", function () {
    HoveredEqupmentUI(boots);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#belt").on("mouseover", function () {
    HoveredEqupmentUI(belt);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#horn").on("mouseover", function () {
    HoveredEqupmentUI(horn);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#trinket").on("mouseover", function () {
    HoveredEqupmentUI(trinket);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#goblet").on("mouseover", function () {
    HoveredEqupmentUI(goblet);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#ring1").on("mouseover", function () {
    HoveredEqupmentUI(ring1);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#ring2").on("mouseover", function () {
    HoveredEqupmentUI(ring2);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $("#weapon").on("mouseover", function () {
    HoveredEqupmentUI(weapon);
  }).on("mouseout", function () {
    LeftEquipmentUI();
  });

  $('#hide-btn').click(function () {
    console.log("close");
    $('#wrapper').hide();
    $('#hide-btn').hide();
    $('#show-btn').show();
    $('#reload-btn').hide();
  });

  $('#show-btn').click(async function () {
    console.log("show");
    FetchPlayerData();
    $('#wrapper').show();
    $('#show-btn').hide();
    $('#hide-btn').show();
  });

  $('#reload-btn').click(async function () {
    FetchPlayerData();
  });

  const refetch = () => {
    FetchPlayerData()
  };

  setInterval(refetch, 60000); // fetch api every 60 seconds

});


function HoveredEqupmentUI(equip) {
  if (equip != "") {
    $(`#followingdiv`).html(equip);
    $('#followingdiv').css({
      display: "block",
      left: (event.pageX) + "px",
      top: (event.pageY + 30) + "px"
    });
  }
}

function LeftEquipmentUI() {
  $('#followingdiv').css({
    display: "none",
    left: (event.pageX) + "px",
    top: (event.pageY + 30) + "px"
  });
}


async function SetPlayerJson() {
  try {
    newUrl = apiUrl + `?fellowship=${ssf}&hardcore=${hc}`;
    const response = await fetch(newUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const ladderJson = await response.json();

    //assign the playerjson if the names match the request 
    for (let i = 0; i < ladderJson.length; i++) {
      let name = aname + " (" + cname + ")";
      if (name == ladderJson[i].name) {
        playerJson = ladderJson[i]
        break;
      }
    }

    //playerJson = ladderJson[0]

  } catch (error) {
    console.error(error.message);
  }
}



function PopulateUIData() {
  amulet = playerJson.build.equipmentMods.amulet;
  boots = playerJson.build.equipmentMods.boots;
  bracer = playerJson.build.equipmentMods.bracer;
  goblet = playerJson.build.equipmentMods.goblet;
  helmet = playerJson.build.equipmentMods.helmet;
  horn = playerJson.build.equipmentMods.horn;
  relic = playerJson.build.equipmentMods.relic;
  ring1 = playerJson.build.equipmentMods.ring1;
  ring2 = playerJson.build.equipmentMods.ring2;
  trinket = playerJson.build.equipmentMods.trinket;
  weapon = playerJson.build.equipmentMods.weapon;
  belt = playerJson.build.equipmentMods.belt;
  stance = playerJson.build.stance;

  if (amulet == "") {

  } else {
    $('#amulet-bg').show();
    $("#amulet").attr("src", "amulet_7_24_number_2.PNG");
    $("#amulet-border").attr("src", "frame-flawless.png");
  }

  if (boots == "") {

  } else {
    $('#boots-bg').show();
    $("#boots").attr("src", "boots_armor_brown_1.PNG");
    $("#boots-border").attr("src", "frame-flawless.png");
  }

  if (bracer == "") {

  } else {
    $('#bracer-bg').show();
    $("#bracer").attr("src", "bracers_gold_2.PNG");
    $("#bracer-border").attr("src", "frame-flawless.png");
  }

  if (goblet == "") {

  } else {
    $('#goblet-bg').show();
    let goblet_element = goblet.split(':');
    goblet_element = goblet_element[0];
    $("#goblet-border").attr("src", "frame-epic.png");
    if (offhand_elements.fire.includes(goblet_element)) {
      $("#goblet").attr("src", "goblet-fire-icon.PNG");
    } else if (offhand_elements.lightning.includes(goblet_element)) {
      $("#goblet").attr("src", "goblet-lightning-icon.PNG");
    } else {
      $("#goblet").attr("src", "goblet-arcane-icon.PNG");
    }
  }

  if (horn == "") {

  } else {
    $('#horn-bg').show();
    let horn_element = horn.split(':');
    horn_element = horn_element[0];
    $("#horn-border").attr("src", "frame-epic.png");
    if (offhand_elements.fire.includes(horn_element)) {
      $("#horn").attr("src", "horn-fire-icon.PNG");
    } else if (offhand_elements.lightning.includes(horn_element)) {
      $("#horn").attr("src", "horn-lightning-icon.PNG");
    } else {
      $("#horn").attr("src", "horn-arcane-icon.PNG");
    }
  }

  if (trinket == "") {

  } else {
    $('#trinket-bg').show();
    let trinket_element = horn.split(':');
    trinket_element = trinket_element[0];
    $("#trinket-border").attr("src", "frame-epic.png");
    if (offhand_elements.fire.includes(trinket_element)) {
      $("#trinket").attr("src", "trinket-fire-icon.PNG");
    } else if (offhand_elements.lightning.includes(trinket_element)) {
      $("#trinket").attr("src", "trinket-lightning-icon.PNG");
    } else {
      $("#trinket").attr("src", "trinket-arcane-icon.PNG");
    }
  }

  if (belt == "") {

  } else {
    $('#belt-bg').show();
    let belt_element = belt.split(':');
    belt_element = belt_element[0];
    $("#belt-border").attr("src", "frame-epic.png");
    if (offhand_elements.fire.includes(belt_element)) {
      $("#belt").attr("src", "firebelt.PNG");
    } else if (offhand_elements.lightning.includes(belt_element)) {
      $("#belt").attr("src", "lightningbelt.PNG");
    } else {
      $("#belt").attr("src", "arcane-belt.PNG");
    }
  }

  if (helmet == "") {

  } else {
    $('#helm-bg').show();
    $("#helm").attr("src", "armor_helmet_metaL_spange.PNG");
    $("#helm-border").attr("src", "frame-flawless.png");
  }

  if (relic == "") {

  } else {
    $('#relic-bg').show();
    $("#relic").attr("src", "relic_shield_06.PNG");
    $("#relic-border").attr("src", "frame-flawless.png");
  }

  if (ring1 == "") {

  } else {
    $('#ring1-bg').show();
    $("#ring1").attr("src", "ring_blue_triangle.PNG");
    $("#ring1-border").attr("src", "frame-flawless.png");
  }

  if (ring2 == "") {

  } else {
    $('#ring2-bg').show();
    $("#ring2").attr("src", "ring_7_24_number_3.PNG");
    $("#ring2-border").attr("src", "frame-flawless.png");
  }

  if (stance == "") {
    $('#weapon').hide();
  } else {
    if (stance == "Polearm") {
      $("#weapon").attr("src", "weapons_maul.PNG");
    } else if (stance == "Sword") {
      $("#weapon").attr("src", "rapier_sword_3.PNG");
    } else if (stance == "TwoHanded") {
      $("#weapon").attr("src", "dwarven_sword.PNG");
    } else if (stance == "Bow") {
      $("#weapon").attr("src", "bow_1.PNG");
    } else if (stance == "Magic") {
      $("#weapon").attr("src", "staff_1_march_2023_wand_3.PNG");
    } else if (stance == "Spear") {
      $("#weapon").attr("src", "weapon_spear_09.PNG");
    }
    $('#weapon').show();
  }

}