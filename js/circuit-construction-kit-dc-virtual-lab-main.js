// Copyright 2017, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  require( 'SCENERY/nodes/Image' ); // Image is required for making toDataURLNodeSynchronous work in the built version
  var Input = require( 'SCENERY/input/Input' );
  var LabScreen = require( 'CIRCUIT_CONSTRUCTION_KIT_DC/lab/LabScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.rootTandem;

  // strings
  var circuitConstructionKitDcVirtualLabTitleString =
    require( 'string!CIRCUIT_CONSTRUCTION_KIT_DC_VIRTUAL_LAB/circuit-construction-kit-dc-virtual-lab.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Sam Reid, Denzell Barnett',
      team: 'Michael Dubson, Ariel Paul, Kathy Perkins, Wendy Adams, Carl Wieman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Alex Dornan, Bryce Griebenow, Ethan Johnson, Liam Mulhall, Ben Roberts',
      graphicArts: 'Bryce Gruneich, Mariah Hermsmeyer, Cheryl McCutchan'
    },
    tandem: tandem,
    accessibility: true
  };

  // Support accessibility for deleting selected circuit elements, but don't support broader tab navigation until it
  // is complete
  document.addEventListener( 'keydown', function( event ) {
    var keyCode = event.keyCode || event.which;
    if ( keyCode === Input.KEY_TAB ) {
      event.preventDefault();
    }
  } );

  // Circuit Construction Kit has unit tests for checking the mathematics for the Modified Nodal Analysis algorithm.  In
  // order to load the classes into an accessible namespace, the *-config.js and *-main.js are loaded however, when
  // running the unit tests we don't also want to launch the simulation.
  if ( !window.circuitConstructionKitTestSuite ) {
    SimLauncher.launch( function() {

      // Launch the simulation once everything is ready
      var sim = new Sim( circuitConstructionKitDcVirtualLabTitleString, [
        new LabScreen( tandem.createTandem( 'labScreen' ), {
          showNoncontactAmmeters: false
        } )
      ], simOptions );
      sim.start();
    } );
  }
} );
