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
                        routeEntry: RouteEntries.Child
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
                        providers: [{ provide: TestChildService, useClass: TestChildService }]
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
                children: [
                    {
                        path: 'child',
                        component: TestChildComponent,
                        providers: [TestChildService],
                    }
                ]
            }
        ]);
    });
});