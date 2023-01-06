import { Routes } from '@angular/router';
import { populateRoutes } from './route-populator';
import { LazyChild } from './strong-route.model';

enum RouteEntries {
    Parent,
    Child
}

class TestComponent {}
class TestChildComponent {}
class TestService {}
class TestChildService {}

describe('routePopulator', () => {
    let routes: LazyChild<void, RouteEntries>[];

    beforeEach(() => {
        routes = [
            {
                path: 'parent',
                routeEntry: RouteEntries.Parent,
                children: [
                    {
                        path: 'child',
                        routeEntry: RouteEntries.Child,
                        data: { initial: 'Test' }
                    }
                ]
            }
        ]
    });

    it('populates simple component type', () => {
        const entryMap = {
            [RouteEntries.Parent]: TestComponent,
            [RouteEntries.Child]: TestChildComponent
        }
        const populated: Routes = populateRoutes(entryMap, routes);
        expect(populated).toEqual([
            {
                path: 'parent',
                component: TestComponent,
                children: [
                    {
                        path: 'child',
                        component: TestChildComponent,
                        data: { initial: 'Test' }
                    }
                ]
            }
        ]);
    });

    it('populates providers array', () => {
        const entryMap = {
            [RouteEntries.Parent]: [TestService],
            [RouteEntries.Child]: [{ provide: TestChildService, useClass: TestChildService }]
        }
        const populated: Routes = populateRoutes(entryMap, routes);
        expect(populated).toEqual([
            {
                path: 'parent',
                providers: [TestService],
                children: [
                    {
                        path: 'child',
                        providers: [{ provide: TestChildService, useClass: TestChildService }],
                        data: { initial: 'Test' }
                    }
                ]
            }
        ]);
    });

    it('populates component and providers', () => {
        const entryMap = {
            [RouteEntries.Parent]: {
                component: TestComponent,
                providers: [TestService]
            },
            [RouteEntries.Child]: {
                component: TestChildComponent,
                providers: [TestChildService]
            }
        }
        const populated: Routes = populateRoutes(entryMap, routes);
        expect(populated).toEqual([
            {
                path: 'parent',
                component: TestComponent,
                providers: [TestService],
                data: undefined,
                children: [
                    {
                        path: 'child',
                        component: TestChildComponent,
                        providers: [TestChildService],
                        data: { initial: 'Test' }
                    }
                ]
            }
        ]);
    });

    it('uses entry data when no route data is present', () => {
        const entryMap = {
            [RouteEntries.Parent]: {
                data: { update: 'New Parent' }
            },
            [RouteEntries.Child]: {
                component: TestChildComponent,
                providers: [TestChildService]
            }
        }
        const populated: Routes = populateRoutes(entryMap, routes);
        expect(populated).toEqual([
            {
                path: 'parent',
                data: { update: 'New Parent' },
                children: [
                    {
                        path: 'child',
                        component: TestChildComponent,
                        providers: [TestChildService],
                        data: { initial: 'Test' }
                    }
                ]
            }
        ]);
    });

    it('combines entry data with route data when both are present', () => {
        const entryMap = {
            [RouteEntries.Parent]: {
                component: TestComponent,
                providers: [TestService]
            },
            [RouteEntries.Child]: {
                component: TestChildComponent,
                providers: [TestChildService],
                data: { update: 'New Child' },
            }
        }
        const populated: Routes = populateRoutes(entryMap, routes);
        expect(populated).toEqual([
            {
                path: 'parent',
                component: TestComponent,
                providers: [TestService],
                data: undefined,
                children: [
                    {
                        path: 'child',
                        component: TestChildComponent,
                        providers: [TestChildService],
                        data: {
                            initial: 'Test',
                            update: 'New Child'
                        }
                    }
                ]
            }
        ]);
    });
});