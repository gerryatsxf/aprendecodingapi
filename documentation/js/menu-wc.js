'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">asesorias documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-50aa900d2fdd9d6898cfade0a0d6bc1496ca33de61c5583f322120be8e056037a69541b07516ee61965248d19b21f6b43cf4d492720d55b916c4640266b55d98"' : 'data-bs-target="#xs-injectables-links-module-AppModule-50aa900d2fdd9d6898cfade0a0d6bc1496ca33de61c5583f322120be8e056037a69541b07516ee61965248d19b21f6b43cf4d492720d55b916c4640266b55d98"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-50aa900d2fdd9d6898cfade0a0d6bc1496ca33de61c5583f322120be8e056037a69541b07516ee61965248d19b21f6b43cf4d492720d55b916c4640266b55d98"' :
                                        'id="xs-injectables-links-module-AppModule-50aa900d2fdd9d6898cfade0a0d6bc1496ca33de61c5583f322120be8e056037a69541b07516ee61965248d19b21f6b43cf4d492720d55b916c4640266b55d98"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' :
                                            'id="xs-controllers-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' :
                                        'id="xs-injectables-links-module-AuthModule-92dc4b2c32bd2b353ddd4661880bbc11ed337e494f716e4fbd7f3c28500c56ae146f1be165f5e49c82b42d6216b9652e88640504813d2726d575f13eb2a85d1f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EncryptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncryptionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AvailabilityModule.html" data-type="entity-link" >AvailabilityModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AvailabilityModule-5a5dc08e2aeeafd8cf842bc9206909f841b6d60d9625207656235fd9fcd4c96a456d73491e33f3e64e1d184cc4e98d5d92420466792e6802e3d95d4b30f1643f"' : 'data-bs-target="#xs-injectables-links-module-AvailabilityModule-5a5dc08e2aeeafd8cf842bc9206909f841b6d60d9625207656235fd9fcd4c96a456d73491e33f3e64e1d184cc4e98d5d92420466792e6802e3d95d4b30f1643f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AvailabilityModule-5a5dc08e2aeeafd8cf842bc9206909f841b6d60d9625207656235fd9fcd4c96a456d73491e33f3e64e1d184cc4e98d5d92420466792e6802e3d95d4b30f1643f"' :
                                        'id="xs-injectables-links-module-AvailabilityModule-5a5dc08e2aeeafd8cf842bc9206909f841b6d60d9625207656235fd9fcd4c96a456d73491e33f3e64e1d184cc4e98d5d92420466792e6802e3d95d4b30f1643f"' }>
                                        <li class="link">
                                            <a href="injectables/AvailabilityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AvailabilityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarModule.html" data-type="entity-link" >CalendarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' : 'data-bs-target="#xs-controllers-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' :
                                            'id="xs-controllers-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' }>
                                            <li class="link">
                                                <a href="controllers/CalendarController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' : 'data-bs-target="#xs-injectables-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' :
                                        'id="xs-injectables-links-module-CalendarModule-24bedb1c7b18bd5e2dc1a5ef91ae3b0982b807c3f788744958cd709d9daab58033ce3bbc5ba42ee83628d22092b7644db0e6ec1629aab8489e10c28d3b613712"' }>
                                        <li class="link">
                                            <a href="injectables/CalendarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DateTimeModule.html" data-type="entity-link" >DateTimeModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EncryptionModule.html" data-type="entity-link" >EncryptionModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EncryptionModule-0edfd218a761f0e05c565e03cdfc00562cf05d8e2549b737bbe5dd57410888098ca4bccfb73b20274149cd10b0797e330a6fd7dea0bda80454677123644b0f32"' : 'data-bs-target="#xs-injectables-links-module-EncryptionModule-0edfd218a761f0e05c565e03cdfc00562cf05d8e2549b737bbe5dd57410888098ca4bccfb73b20274149cd10b0797e330a6fd7dea0bda80454677123644b0f32"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EncryptionModule-0edfd218a761f0e05c565e03cdfc00562cf05d8e2549b737bbe5dd57410888098ca4bccfb73b20274149cd10b0797e330a6fd7dea0bda80454677123644b0f32"' :
                                        'id="xs-injectables-links-module-EncryptionModule-0edfd218a761f0e05c565e03cdfc00562cf05d8e2549b737bbe5dd57410888098ca4bccfb73b20274149cd10b0797e330a6fd7dea0bda80454677123644b0f32"' }>
                                        <li class="link">
                                            <a href="injectables/EncryptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncryptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FreeSlotModule.html" data-type="entity-link" >FreeSlotModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' : 'data-bs-target="#xs-controllers-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' :
                                            'id="xs-controllers-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' }>
                                            <li class="link">
                                                <a href="controllers/FreeSlotController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FreeSlotController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' : 'data-bs-target="#xs-injectables-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' :
                                        'id="xs-injectables-links-module-FreeSlotModule-3a8693c4d615cc98c6ed48b3433b76318b297741ad2a1c3796b9b02a8895336d91f404681232348ce19867bb3b6391020157c1a728b35d248de80ab69305c08f"' }>
                                        <li class="link">
                                            <a href="injectables/AvailabilityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AvailabilityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CalendarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FreeSlotService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FreeSlotService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MeetingModule.html" data-type="entity-link" >MeetingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MeetingModule-2ff280410911dd75b1a6b7778b8be5c66bba12b3ee5204d3417319cff7fcea44090d1c54467ae1228aa4cc402769867d78133493cb4755e5008245381949a22f"' : 'data-bs-target="#xs-injectables-links-module-MeetingModule-2ff280410911dd75b1a6b7778b8be5c66bba12b3ee5204d3417319cff7fcea44090d1c54467ae1228aa4cc402769867d78133493cb4755e5008245381949a22f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MeetingModule-2ff280410911dd75b1a6b7778b8be5c66bba12b3ee5204d3417319cff7fcea44090d1c54467ae1228aa4cc402769867d78133493cb4755e5008245381949a22f"' :
                                        'id="xs-injectables-links-module-MeetingModule-2ff280410911dd75b1a6b7778b8be5c66bba12b3ee5204d3417319cff7fcea44090d1c54467ae1228aa4cc402769867d78133493cb4755e5008245381949a22f"' }>
                                        <li class="link">
                                            <a href="injectables/FreeSlotService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FreeSlotService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MeetingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeetingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationModule.html" data-type="entity-link" >NotificationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationModule-a14b0d0b011cd86934959918dde2e001cd10a190be06d06706df387ff152e336ea06126d4446f2a26d1146c8b40922755dae37439fd13e896f08e0d0f6d9d648"' : 'data-bs-target="#xs-injectables-links-module-NotificationModule-a14b0d0b011cd86934959918dde2e001cd10a190be06d06706df387ff152e336ea06126d4446f2a26d1146c8b40922755dae37439fd13e896f08e0d0f6d9d648"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationModule-a14b0d0b011cd86934959918dde2e001cd10a190be06d06706df387ff152e336ea06126d4446f2a26d1146c8b40922755dae37439fd13e896f08e0d0f6d9d648"' :
                                        'id="xs-injectables-links-module-NotificationModule-a14b0d0b011cd86934959918dde2e001cd10a190be06d06706df387ff152e336ea06126d4446f2a26d1146c8b40922755dae37439fd13e896f08e0d0f6d9d648"' }>
                                        <li class="link">
                                            <a href="injectables/MeetingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeetingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' : 'data-bs-target="#xs-controllers-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' :
                                            'id="xs-controllers-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' : 'data-bs-target="#xs-injectables-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' :
                                        'id="xs-injectables-links-module-PaymentModule-9678543575cbff57bf99dcaf8fb83f9da5eb0596341718398adf0104d2de1be97071095d174af3437ce72e098ddd5834470a20067464d720100f537d42fd8351"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SessionModule.html" data-type="entity-link" >SessionModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SessionModule-b0ca315b71d51ce6b6ad334c41e22abf162c58db855b3abd9f2c0b05a1a098859fb208e4e032794b3a31e253f0202f6291b64c59b3161383becf267534fb6afe"' : 'data-bs-target="#xs-injectables-links-module-SessionModule-b0ca315b71d51ce6b6ad334c41e22abf162c58db855b3abd9f2c0b05a1a098859fb208e4e032794b3a31e253f0202f6291b64c59b3161383becf267534fb6afe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SessionModule-b0ca315b71d51ce6b6ad334c41e22abf162c58db855b3abd9f2c0b05a1a098859fb208e4e032794b3a31e253f0202f6291b64c59b3161383becf267534fb6afe"' :
                                        'id="xs-injectables-links-module-SessionModule-b0ca315b71d51ce6b6ad334c41e22abf162c58db855b3abd9f2c0b05a1a098859fb208e4e032794b3a31e253f0202f6291b64c59b3161383becf267534fb6afe"' }>
                                        <li class="link">
                                            <a href="injectables/SessionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CalendarController.html" data-type="entity-link" >CalendarController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FreeSlotController.html" data-type="entity-link" >FreeSlotController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MeetingController.html" data-type="entity-link" >MeetingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PaymentController.html" data-type="entity-link" >PaymentController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Availability.html" data-type="entity-link" >Availability</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookRequestResponse.html" data-type="entity-link" >BookRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusySlotDto.html" data-type="entity-link" >BusySlotDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Calendar.html" data-type="entity-link" >Calendar</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAvailabilityDto.html" data-type="entity-link" >CreateAvailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCalendarDto.html" data-type="entity-link" >CreateCalendarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMeetingRequestDto.html" data-type="entity-link" >CreateMeetingRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMeetingResultDto.html" data-type="entity-link" >CreateMeetingResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link" >CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSessionRequestDto.html" data-type="entity-link" >CreateSessionRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateTimeDto.html" data-type="entity-link" >DateTimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FreeSlotDto.html" data-type="entity-link" >FreeSlotDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GuestFreeSlotDto.html" data-type="entity-link" >GuestFreeSlotDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HoomanWorkSlotDto.html" data-type="entity-link" >HoomanWorkSlotDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/NylasFreeBusy.html" data-type="entity-link" >NylasFreeBusy</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link" >Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterResponseDto.html" data-type="entity-link" >RegisterResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendNotificationRequestDto.html" data-type="entity-link" >SendNotificationRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SessionCompletedDto.html" data-type="entity-link" >SessionCompletedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimeSlot.html" data-type="entity-link" >TimeSlot</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAvailabilityDto.html" data-type="entity-link" >UpdateAvailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCalendarDto.html" data-type="entity-link" >UpdateCalendarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaymentDto.html" data-type="entity-link" >UpdatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSessionRequestDto.html" data-type="entity-link" >UpdateSessionRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCredentialsDto.html" data-type="entity-link" >UserCredentialsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRegistrationDto.html" data-type="entity-link" >UserRegistrationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkSlot.html" data-type="entity-link" >WorkSlot</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkSlotDto.html" data-type="entity-link" >WorkSlotDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AvailabilityService.html" data-type="entity-link" >AvailabilityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarService.html" data-type="entity-link" >CalendarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EncryptionService.html" data-type="entity-link" >EncryptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FreeSlotService.html" data-type="entity-link" >FreeSlotService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeetingService.html" data-type="entity-link" >MeetingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link" >PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ISession.html" data-type="entity-link" >ISession</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meeting.html" data-type="entity-link" >Meeting</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});