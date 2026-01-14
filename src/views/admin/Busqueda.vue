<template>
    <div class="landing-busqueda pt-5">

        <div class="img-landing-busqueda pt-5">
            <img @click="onClear()" src="@/assets/img/logos/logo-full.png" alt="Logo"
                class="cursor-pointer logo-busqueda" />
        </div>

        <div class="search-container mt-3">
            <div class="search-box">
                <AutoComplete v-model="filter.GLOBAL" :suggestions="dataComplete" @complete="searchSugges"
                    optionLabel="DESCP" class="search-input"
                    placeholder="Busca por nombre de caso, palabra clave ó selecciona los filtros"
                    @keydown.enter="search" @item-select="search">
                    <template #option="slotProps">
                        <div class="d-flex align-items-center gap-2">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.99992 4.83301H8.00525M7.99992 10.1663V6.83301M14.6666 7.49967C14.6666 11.1817 11.6819 14.1663 7.99992 14.1663C4.31792 14.1663 1.33325 11.1817 1.33325 7.49967C1.33325 3.81767 4.31792 0.833008 7.99992 0.833008C11.6819 0.833008 14.6666 3.81767 14.6666 7.49967Z"
                                    stroke="#5E5E5C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <span>{{ slotProps.option.DESCP }}</span>
                        </div>
                    </template>
                </AutoComplete>

                <!-- Botón para limpiar -->
                <button v-if="filter.GLOBAL" @click="filter.GLOBAL = null" class="btn-clear">
                    <img src="@/assets/img/icons/close.svg" alt="Close" />
                </button>

                <!-- Separador -->
                <div class="separator"></div>

                <!-- Icono de filtro -->
                <!-- <div v-if="['2', '3', '4'].includes(role.IDPLN)"> -->
                <div>
                    <button class="btn-filter" @click="() => {
                        isCollapsed2 = !isCollapsed2;
                        isCollapsed = true;
                    }">
                        <img src="@/assets/img/icons/settings-arrow.svg" alt="Filter" />
                    </button>
                    <div id="filterbar-container2" v-show="!isCollapsed2" ref="filterMenu2" class="px-5 py-2">
                        <div class="form-check" style="display: flex; align-items: center; gap: 3px"
                            v-for="opcion in opcionesFiltro" :key="opcion.valor">
                            <input class="form-check-input" type="radio" style="cursor: pointer" name="modoBusqueda"
                                :id="'radio-' + opcion.valor" :value="opcion.valor" v-model="modoBusqueda" />
                            <label v-tooltip.bottom="{
                                value: opcion.resena,
                                classes: ['tooltip-rojo'],
                                style: {
                                    fontSize: '0.25rem',
                                },
                            }" style="font-size:15px" class="form-check-label" :for="'radio-' + opcion.valor">
                                {{ opcion.texto }}
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="btn-filter" @click="() => {
                        isCollapsed = !isCollapsed;
                        isCollapsed2 = true;
                    }">
                        <img src="@/assets/img/icons/filter.svg" alt="Filter" />
                    </button>
                    <div id="filterbar-container" v-show="!isCollapsed" ref="filterMenu">
                        <div class="filter">
                            <div class="filter-header">
                                <div class="flex flex-row contenedor-tab-global">
                                    <div @click="typeSaarch = 'jurisprudences'; isFilter = 'jurisprudences-generales'; criterioActual = 'year-publication'"
                                        :class="typeSaarch == 'jurisprudences' ? 'active-criterio' : ''"
                                        class="flex gap-1 p-2 flex-row justify-content-center contenedor-tab align-items-center">
                                        <img class="container-nav" src="@/assets/img/icons/corona-2.svg" alt="Close" />
                                        <p class="container-nav">
                                            Jurisprudencia
                                        </p>
                                    </div>
                                    <div @click="typeSaarch = 'legislations'; isFilter = 'legislaciones-generales'; criterioActual = 'year-publication'"
                                        :class="typeSaarch == 'legislations' ? 'active-criterio' : ''"
                                        class="flex gap-1 p-2 flex-row justify-content-center contenedor-tab align-items-center">
                                        <img class="container-nav" src="@/assets/img/icons/settings-2.svg"
                                            alt="Close" />
                                        <p class="container-nav">
                                            Legislación
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row contenedor-tab gap-0 text-center">
                                    <a v-if="typeSaarch == 'jurisprudences'" class="flex-grow-1 p-2 container-nav"
                                        @click="isFilter = 'jurisprudences-generales'; criterioActual = 'year-publication', typeSaarch = 'jurisprudences'"
                                        :class="isFilter == 'jurisprudences-generales' ? 'active-criterio' : ''">
                                        Criterios Generales
                                    </a>
                                    <a v-if="typeSaarch == 'jurisprudences'" class="flex-grow-1 p-2 container-nav"
                                        @click="isFilter = 'jurisprudences-compliance'; criterioActual = 'year-publication', typeSaarch = 'jurisprudences'"
                                        :class="isFilter == 'jurisprudences-compliance' ? 'active-criterio' : ''">
                                        Compliance
                                    </a>
                                    <a v-if="typeSaarch == 'jurisprudences'" class="flex-grow-1 p-2 container-nav"
                                        @click="isFilter = 'jurisprudences-extincion'; criterioActual = 'year-publication', typeSaarch = 'jurisprudences'"
                                        :class="isFilter == 'jurisprudences-extincion' ? 'active-criterio' : ''">
                                        Extinción de Dominio
                                    </a>
                                    <a v-if="typeSaarch == 'legislations'" class="flex-grow-1 p-2 container-nav"
                                        @click="isFilter = 'legislaciones-generales', criterioActual = 'year-publication', typeSaarch = 'legislations'"
                                        :class="isFilter == 'legislaciones-generales' ? 'active-criterio' : ''">
                                        Criterios Generales
                                    </a>
                                </div>
                            </div>
                            <div class="contenedor-filtros">
                                <div class="row">
                                    <div class="col-12 col-md-6 px-3 mb-3 d-flex gap-2"
                                        :class="['legislaciones-generales', 'jurisprudences-generales', 'jurisprudences-compliance', 'jurisprudences-extincion'].includes(isFilter) && criterioActual === 'year-publication' ? 'col-12 row' : 'd-none'">
                                        <div class="col-12">
                                            <label for="FRESOLUTION1" class="form-label">Fecha de Inicio</label>
                                            <date-picker v-model="filter.FRESOLUTION1" value-type="format"
                                                @change="filter.FRESOLUTION1 = $event" :value="filter.FRESOLUTION1"
                                                appendTo="self" panelClass="force-open-down">
                                            </date-picker>
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 px-3 mb-3 d-flex gap-2"
                                        :class="['legislaciones-generales', 'jurisprudences-generales', 'jurisprudences-compliance', 'jurisprudences-extincion'].includes(isFilter) && criterioActual === 'year-publication' ? 'col-12 row' : 'd-none'">
                                        <div class="col-12">
                                            <label for="FRESOLUTION2" class="form-label">Fecha de Fin</label>
                                            <date-picker v-model="filter.FRESOLUTION2" value-type="format"
                                                @change="filter.FRESOLUTION2 = $event" :value="filter.FRESOLUTION2"
                                                appendTo="self" panelClass="force-open-down">
                                            </date-picker>
                                        </div>
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="Delito" class="form-label">Delito</label>
                                        <el-tree-select :style="{ width: '100%', maxWidth: '100%', overflow: 'hidden' }"
                                            visible-options="5" v-model="filter.DELITO" :data="selects.DELITOS" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :collapse-tags-tooltip="true" :max-collapse-tags="1"
                                            @check-change="(node, checked) => {
                                                filter.DELITO = filter.DELITO || [];
                                                if (node.children && node.children.length > 0) {
                                                    node.children.forEach(child => {
                                                        if (checked) {
                                                            filter.DELITO.push(child.value);
                                                        } else {
                                                            filter.DELITO = filter.DELITO.filter(item => item !== child.value);
                                                        }
                                                    });
                                                }
                                            }" no-data-text="No hay opciones disponibles" class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="Recurso" class="form-label">Recurso</label>
                                        <el-tree-select v-model="filter.RECURSO" :data="selects['TIPO DE RECURSO']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="Organos" class="form-label">Órgano Jurisdiccional</label>
                                        <el-tree-select v-model="filter.OJURISDICCIONAL"
                                            :data="selects['ÓRGANO JURISDICCIONAL']" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            @check-change="(node, checked) => {
                                                filter.OJURISDICCIONAL = filter.OJURISDICCIONAL || [];
                                                if (node.children && node.children.length > 0) {
                                                    node.children.forEach(child => {
                                                        if (checked) {
                                                            filter.OJURISDICCIONAL.push(child.value);
                                                        } else {
                                                            filter.OJURISDICCIONAL = filter.OJURISDICCIONAL.filter(item => item !== child.value);
                                                        }
                                                    });
                                                }
                                            }" class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="Magistrados" class="form-label">Magistrado</label>
                                        <el-tree-select v-model="filter.MAGISTRATES" :data="selects['MAGISTRATES']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="JVINCULANTE" class="form-label">Jurisprudencia Vinculante</label>
                                        <el-tree-select v-model="filter.JVINCULANTE"
                                            :data="selects['JURISPRUDENCIA VINCULANTE']" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            @check-change="(node, checked) => {
                                                filter.JVINCULANTE = filter.JVINCULANTE || [];
                                                if (node.children && node.children.length > 0) {
                                                    node.children.forEach(child => {
                                                        if (checked) {
                                                            filter.JVINCULANTE.push(child.value);
                                                        } else {
                                                            filter.JVINCULANTE = filter.JVINCULANTE.filter(item => item !== child.value);
                                                        }
                                                    });
                                                }
                                            }" class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <div class="switch-container">
                                            <label for="BLOG" class="switch-label">Casos Emblemáticos</label>
                                            <label class="switch">
                                                <input type="checkbox" id="BLOG" v-model="filter.BLOG">
                                                <span class="slider"></span>
                                            </label>

                                            <div class="d-inline-block position-relative">
                                                <img src="@/assets/img/icons/interrogation.svg" alt="Switch"
                                                    class="cursor-pointer info-icon" v-b-tooltip.hover
                                                    title="Genera alarma social por su alta significancia criminal." />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales', 'jurisprudences-extincion'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="KEYWORDS" class="form-label">Palabras Clave</label>
                                        <b-form-tags separator="," v-model="filter.KEYWORDS" tag-variant="primary"
                                            tag-pills tag-readonly tag-class="bg-app-secondary-b text-app-primary-b"
                                            tag-size="sm" placeholder="Agregar una palabra clave"
                                            addButtonText="Agregar" removeButtonText="Eliminar" removeOnDeleteKey />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['legislaciones-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="NMRCN" class="form-label">Numeración</label>
                                        <input type="text" v-model="filter.NMRCN" @keydown.enter="search" id="NMRCN"
                                            class="form-control" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-compliance'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="MATERIA" class="form-label">Materia</label>
                                        <el-tree-select v-model="filter.MATERIA" :data="selects['MATERIA']" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['jurisprudences-generales', 'jurisprudences-compliance', 'jurisprudences-extincion'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="JURISDICCION" class="form-label">Jurisdicción</label>
                                        <el-tree-select v-model="filter.JURISDICCION" :data="selects['JURISDICCIÓN']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['legislaciones-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="TITLE" class="form-label">Tipo de Norma</label>
                                        <el-tree-select v-model="filter.TPONRMA" :data="selects['TIPO DE NORMA']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3 mb-3"
                                        :class="['legislaciones-generales'].includes(isFilter) ? 'col-12' : 'd-none'">
                                        <label for="OEMISOR" class="form-label">Órgano Emisor</label>
                                        <el-tree-select v-model="filter.OEMISOR" :data="selects['ÓRGANO EMISOR']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="search-actions d-flex justify-content-between align-items-center">
                <!-- Botón de búsqueda -->
                <button class="btn-search" type="button" id="filter-btn" @click="search">
                    Buscar
                </button>
                <!-- // boton limpiar -->
                <button class="btn-clear-button" type="button" @click="onClear(1)">
                    Limpiar
                </button>
            </div>
        </div>

        <div class="top-search-container">
            <Carousel :breakpoints="carouselConfig.breakpoints" :wrap-around="carouselConfig.wrapAround"
                :autoplay="false" :settings="{ navigationEnabled: true }">
                <Slide class="p-2 mb-5" v-for="(valor, index) in topSearch" :key="valor.DESCP + '-' + index">

                    <div class="top-search-chip d-flex" @click="filter.GLOBAL = valor.DESCP; search()">
                        <button
                            @click.stop="clearTopSearch(index, valor.DESCP)"
                            class="btn-clear-item">
                           X
                        </button>
                        <div class="d-flex align-items-center gap-2" v-tooltip.bottom="{
                            value: valor.DESCP,
                            style: {
                                fontSize: '0.35rem',
                                color: '#4A5568',
                            },
                        }">
                            <span>{{ cortarDescripcion(valor.DESCP) }}</span>
                        </div>
                    </div>
                </Slide>



                <template #addons>
                    <Pagination />
                </template>
            </Carousel>
        </div>

        <div v-if="resultados.length > 0" class="search-results">
            <p class="text-left mt-3 color-blue font-weight-bold">
                Se está mostrando {{ table.perPage }} registros, de {{ (table.currentPage - 1) *
                    table.perPage + 1 }} - {{
                    table.currentPage * table.perPage }} de {{ table.totalRows }} registros en total.
            </p>
            <div class="col-12 p-0">
                <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                    @update:model-value="handleSearch" :per-page="table.perPage" aria-controls="my-table"
                    class="my-0" />
            </div>
            <div v-for="(item, index) in resultados" :key="index" class="result-item">
                <!-- Título con flecha -->
                <div class="result-title" @click="openModalWithData(item)">
                    <span>{{ item.TITULO }}</span>
                </div>

                <div v-if="item.TYPE == 'jurisprudences'" class="row">
                    <!-- Pretensión / Delito -->
                    <p class="result-info px-2 py-1 px-2 py-1 col-12 col-md-4">
                        <strong>Pretensión / Delito:</strong><br>{{item.DELITO?.length > 0 ? item.DELITO?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Tipo de Recurso:</strong> <br>{{item.RECURSO?.length > 0 ? item.RECURSO?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Órgano Jurisdiccional:</strong> <br>{{item.OJURISDICCIONAL?.length > 0 ?
                            item.OJURISDICCIONAL?.map(o => o.DESCP).join(', ') : '-'}}
                    </p>
                    <!-- <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Jurisprudencia Vinculante:</strong> {{item.DELITO.map((delito) => delito.DESCP).join(', ')}}
                    </p> -->
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Caso Emblemático:</strong> <br>{{ item?.TYPE == "jurisprudences" ?
                            (item?.CASO || "-") : (item?.RTITLE || '-') }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Caso Vinculante:</strong> <br>{{ item.INDICADOR ? 'Sí' : 'No' }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Palabras Clave:</strong> <br>{{item.KEYWORDS?.split(',').map(p => p.trim()).join(', ')}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-12">
                        <strong>Síntesis:</strong> <br>{{ item.SHORTSUMMARY3 }}
                    </p>

                </div>

                <div v-if="item.TYPE == 'legislations'" class="row">
                    <!-- Pretensión / Delito -->
                    <p class="result-info px-2 py-1 px-2 py-1 col-12 col-md-3">
                        <strong>Numeración:</strong><br>{{ item.NMRCN }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-3">
                        <strong>Fecha de publicación:</strong> <br>{{ formateReverse(item.FRESOLUTION) }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-3">
                        <strong>Órgano emisor:</strong> <br>{{item.OEMISOR?.length > 0 ? item.OEMISOR?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-3">
                        <strong>Estado:</strong> <br>
                        <span>{{ item.SITUACION }}</span>
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-8">
                        <strong>Denominación oficial:</strong> <br>{{ item?.RTITLE || '-' }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Tipo de Norma:</strong> <br>{{item.TPONRMA?.length > 0 ? item.TPONRMA?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                </div>
            </div>
            <div class="col-12 p-0">
                <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                    @update:model-value="handleSearch" :per-page="table.perPage" aria-controls="my-table"
                    class="my-0" />
            </div>
            <p class="text-left mt-3 color-blue font-weight-bold">
                Se está mostrando {{ table.perPage }} registros, de {{ (table.currentPage - 1) *
                    table.perPage + 1 }} - {{
                    table.currentPage * table.perPage }} de {{ table.totalRows }} registros en total.
            </p>
        </div>

        <div v-if="resultados.length === 0 && !isLoading" class="no-results">
            <div class="no-results-icon">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="58" stroke="url(#gradient1)" stroke-width="3" fill="none" opacity="0.2"/>
                    <path d="M50 45C50 39.4772 54.4772 35 60 35C65.5228 35 70 39.4772 70 45" stroke="url(#gradient1)" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="60" cy="60" r="20" stroke="url(#gradient1)" stroke-width="3" fill="none"/>
                    <path d="M75 75L85 85" stroke="url(#gradient1)" stroke-width="3" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#DF2DB2;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#185CE6;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <h3 class="no-results-title">¡Comienza tu búsqueda!</h3>
            <p class="no-results-description">
                Utiliza el buscador y los filtros para encontrar<br>
                jurisprudencias y legislaciones de tu interés
            </p>
            <div class="no-results-tips">
                <div class="tip-item">
                    <span class="tip-icon">🔍</span>
                    <span class="tip-text">Escribe palabras clave</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">⚙️</span>
                    <span class="tip-text">Aplica filtros específicos</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">📅</span>
                    <span class="tip-text">Filtra por fechas</span>
                </div>
            </div>
        </div>

        <div class="floating-delitos">
            <div class="fixed bottom-0 start-50 translate-middle-x z-1050 mb-3 text-center"
                :class="{ 'card-visible': showCard }">
                <button class="py-2 px-3 btn dropdown-toggle dropdown-button" type="button" @click="toggleCard">
                    Sobre los filtros
                </button>
                <transition name="fade-slide">
                    <div v-if="showCard" class="card-items">
                        <div class="p-2 card-body" v-for="(item, index) in items" :key="index">
                            <div class="card-title">
                                <img src="@/assets/img/icons/questions.svg" alt="Info" class="info-icon" />
                                <h5>{{ item.title }}</h5>
                            </div>
                            <p class="card-text">{{ item.description }}</p>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <transition name="fade">
            <div v-if="isLoading" class="custom-loader-overlay">
                <div class="custom-loader">
                    <div class="loader-spinner">
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                    </div>
                    <p class="loader-text">Buscando...</p>
                </div>
            </div>
        </transition>

        <ModalMostrarResolucion :openModal="openModal" :toggleModal="() => this.openModal = !this.openModal"
            :pdfUrl="pdfUrl" :data="rowData" :role="role" />

        <!-- Botón scroll to top -->
        <transition name="fade-scale">
            <button 
                v-if="showScrollTop" 
                @click="scrollToTop" 
                class="scroll-to-top-btn"
                aria-label="Ir arriba">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </transition>

    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { BFormTags, BPagination } from 'bootstrap-vue-next';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import { toast } from 'vue3-toastify';
import AutoComplete from 'primevue/autocomplete';

// PROXY
import MagistradoProxy from "../../proxies/Magistrados.Proxy.js";
import filterProxy from "../../proxies/FilterProxy.js";
import AdminEntriesProxy from "../../proxies/AdminEntriesProxy.js";
import ModalMostrarResolucion from './Modales/ModalMostrarResolucion.vue';

export default {
    data() {
        return {
            carouselConfig: {
                autoplay: 5000,
                breakpoints: {
                    640: {
                        itemsToShow: 1,
                        itemsToScroll: 1,
                    },
                    768: {
                        itemsToShow: 2,
                        itemsToScroll: 2,
                    },
                    1024: {
                        itemsToShow: 3,
                        itemsToScroll: 3,
                    },
                    1280: {
                        itemsToShow: 3,
                        itemsToScroll: 3,
                    },
                    1536: {
                        itemsToShow: 3,
                        itemsToScroll: 3,
                    },
                },
            },
            opcionesFiltro: [
                { valor: 1, texto: 'Contenga solamente estas palabras', resena: 'Busca resoluciones que incluyan exclusivamente las palabras ingresadas.' },
                { valor: 2, texto: 'Contenga alguna de estas palabras', resena: 'Busca resoluciones que incluyan exactamente la frase ingresada, manteniendo el mismo orden y las mismas palabras.' },
                { valor: 3, texto: 'Contenga la frase completa', resena: 'Busca resoluciones que incluyan al menos una de las palabras ingresadas.' }
            ],
            modoBusqueda: 3,
            topSearch: [],
            typeSaarch: "jurisprudences",
            isFilter: "jurisprudences-generales",
            criterioActual: "year-publication",
            isLoading: false,
            isCollapsed: true,
            isCollapsed2: true,
            showFilters: false,
            resultados: [],
            table: {
                currentPage: 1,
                perPage: 10,
                totalRows: 0
            },
            default: {
                GLOBAL: null,
                FRESOLUTION1: [],
                DELITO: null,
                NMRCN: null,
                TPONRMA: null,
                OEMISOR: null,
                RECURSO: null,
                OJURISDICCIONAL: null,
                MAGISTRATES: null,
                JVINCULANTE: null,
                FRESOLUTION2: [],
                MATERIA: null,
                JURISDICCION: null,
                TITLE: null,
                CRITERIO: null,
                KEYWORDS: [],
                TEMA: null,
                BLOG: false,
                SUBTEMA: null,
            },

            filter: {
                GLOBAL: null,
                FRESOLUTION1: [],
                DELITO: [],
                NMRCN: [],
                TPONRMA: [],
                OEMISOR: [],
                RECURSO: [],
                OJURISDICCIONAL: [],
                MAGISTRATES: [],
                JVINCULANTE: [],
                FRESOLUTION2: [],
                MATERIA: [],
                JURISDICCION: [],
                TITLE: null,
                TYPE: "jurisprudences",
                CRITERIO: null,
                KEYWORDS: [],
                TEMA: null,
                BLOG: false,
                SUBTEMA: null,
                CURRENTPAGE: 1,
                PERPAGE: 10,
                INDICADOR: 2
            },
            selects: {
                "MAGISTRATES": [],
                "DELITOS": [],
                "ÁMBITO": [],
                "ÓRGANO JURISDICCIONAL": [],
                "RECURSOS": [],
                "MATERIAS": [],
                "NORMA": [],
                "JURISPRUDENCIA VINCULANTE": [],
                "JURISDICCIONES": [],
                "TIPO DE NORMA": [],
                "ÓRGANO EMISOR": [],
            },
            showCard: false,
            items: [],
            Search,
            pdfUrl: '',
            openModal: false,
            dataComplete: [],
            rowData: {},
            showScrollTop: false
        };
    },
    components: {
        BPagination,
        BFormTags,
        AutoComplete,
        ModalMostrarResolucion,
        Slide,
        Pagination,
        Carousel,
    },
    props: {
        role: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        scrollLeft() {
            this.$refs.scrollContainer.scrollLeft -= 200;
        },
        scrollRight() {
            this.$refs.scrollContainer.scrollLeft += 200;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        handleScroll() {
            this.showScrollTop = window.scrollY > 300;
        },
        toggleCard() {
            this.showCard = !this.showCard;
        },
        formateReverse(date) {
            try {
                if (!date) return null;
                const parts = date.split('-');
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            } catch (error) {
                console.error("Error al formatear la fecha:", error);
                return null;
            }
        },
        openModalWithData(item) {
            this.rowData = item;
            this.openModal = true;
        },
        searchSugges() {
            if (this.filter.GLOBAL?.length < 5) return;

            this.dataComplete.value = []
            AdminEntriesProxy.searchSugges({
                GLOBAL: this.filter.GLOBAL,
                TYPE: this.typeSaarch
            })
                .then((response) => {
                    this.dataComplete = response?.map((item) => {
                        return { DESCP: item?.DESCP.trim() }
                    });

                })
                .catch(() => {
                    this.dataComplete = []
                })
                .finally(() => this.isLoading = false);
        },
        // BUSQUEDA
        handleSearch(page) {
            let filtro = {
                INIT: ((page - 1) <= 0 ? 0 : (page - 1)) * this.table.perPage,
                ROWS: this.table.perPage
            };

            this.search(filtro);
        },
        async clearTopSearch(index, descripcion) {
            let copyDelete = {
                index,
                descripcion
            }
            // eliminar de top search
            this.topSearch.splice(copyDelete.index, 1);
            await AdminEntriesProxy.clearTopSearch(descripcion, this.typeSaarch)
                .then((res) => {
                    if(res.STATUS){
                        toast.success("Búsqueda eliminada de las más frecuentes", { toastId: "success" });
                        return
                    }

                    this.topSearch.push({ DESCP: copyDelete.descripcion });
                })
                .catch(() => {
                    this.topSearch.push({ DESCP: copyDelete.descripcion });
                });

            console.log("Limpiando top search:", descripcion);
        },
        async listTopSearch() {
            await AdminEntriesProxy.listTopSearch(this.typeSaarch)
                .then((response) => {
                    console.log("Top search response:", response);
                    this.topSearch = [];
                    if (!response) {
                        return;
                    }

                    this.topSearch = response?.map((item) => {
                        return { DESCP: item?.DESCP.trim() }
                    });

                    // campos unicos 
                    this.topSearch = this.topSearch.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.DESCP === item.DESCP
                        ))
                    );
                })
                .catch(() => {
                    this.topSearch = [];
                });
        },
        async search(ffff = {}) {
            this.isCollapsed = true;
            this.showFilters = true;
            let filtro = { ...this.filter, ...ffff };


            filtro.TYPE = this.typeSaarch;
            this.isLoading = true;

            let FRESOLUTIONFILTER = null;
            if (filtro.FRESOLUTION1 && filtro.FRESOLUTION2) {
                FRESOLUTIONFILTER = filtro.FRESOLUTION1 + ',' + filtro.FRESOLUTION2;
            } else if (filtro.FRESOLUTION1) {
                FRESOLUTIONFILTER = filtro.FRESOLUTION1 + ',';
            } else if (filtro.FRESOLUTION2) {
                FRESOLUTIONFILTER = ',' + filtro.FRESOLUTION2;
            }

            await AdminEntriesProxy.search({
                ...filtro,
                GLOBAL: filtro.GLOBAL?.DESCP || filtro.GLOBAL,
                FRESOLUTION: FRESOLUTIONFILTER,
                DELITO: filtro.DELITO ? filtro.DELITO.join(",") : null,
                RECURSO: filtro.RECURSO ? filtro.RECURSO.join(",") : null,
                OJURISDICCIONAL: filtro.OJURISDICCIONAL ? filtro.OJURISDICCIONAL.join(",") : null,
                MAGISTRATES: filtro.MAGISTRATES ? filtro.MAGISTRATES.join(",") : null,
                JVINCULANTE: filtro.JVINCULANTE ? filtro.JVINCULANTE.join(",") : null,
                MATERIA: filtro.MATERIA ? filtro.MATERIA.join(",") : null,
                JURISDICCION: filtro.JURISDICCION ? filtro.JURISDICCION.join(",") : null,
                ROWS: filtro?.ROWS || 10,
                INIT: filtro?.INIT || 0,
                NMRCN: filtro.NMRCN,
                TYPE: this.typeSaarch,
                AMBIT: this.isFilter == 'generales' ? null : (this.isFilter == 'jurisprudences-compliance' ? '466' : (this.isFilter == 'jurisprudences-extincion' ? '624' : null)),
                TPONRMA: filtro.TPONRMA ? filtro.TPONRMA.join(",") : null,
                OEMISOR: filtro.OEMISOR ? filtro.OEMISOR.join(",") : null,
                KEYWORDS: filtro.KEYWORDS ? filtro.KEYWORDS.join(",") : null,
                TEMA: filtro.TEMA,
                SUBTEMA: filtro.SUBTEMA,
                BLOG: filtro.BLOG ? 'emblematic' : null,
                MODO: this.modoBusqueda
            })
                .then((response) => {
                    if (!response) {
                        this.resultados = [];
                        this.table.totalRows = 0;
                        return;
                    }
                    this.resultados = response?.map((item) => {
                        return {
                            ...item,
                            DELITO: JSON.parse(item.DELITO),
                            TPONRMA: JSON.parse(item.TPONRMA),
                            OEMISOR: JSON.parse(item.OEMISOR),
                            RECURSO: JSON.parse(item.RECURSO),
                            OJURISDICCIONAL: JSON.parse(item.OJURISDICCIONAL),
                            AMBIT: JSON.parse(item.AMBIT),
                            JURISDICCION: JSON.parse(item.JURISDICCION),
                            MAGISTRATES: JSON.parse(item.MAGISTRATES),
                            FRESOLUTION: item.FRESOLUTION ? item.FRESOLUTION.split("T")[0] : null,
                            TEMA: ![null, undefined, ""].includes(item?.TEMA) ? item.TEMA : null,
                            SUBTEMA: ![null, undefined, ""].includes(item?.SUBTEMA) ? item.SUBTEMA : null,
                            SHORTSUMMARY: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? item.SHORTSUMMARY : null,
                            SHORTSUMMARY2: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 18) : null,
                            SHORTSUMMARY3: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 10000, false) : null,
                        };
                    });

                    this.table.totalRows = response?.[0]?.TOTALROWS || 0;
                })
                .catch(() => {
                    toast.error("Ocurrió un error al buscar", { toastId: "error" });
                })
                .finally(() => {
                    this.isLoading = false;
                    this.listTopSearch();
                });

        },
        setPalabras(palabra, cantidad = 15, isBandera = true) {
            if (!palabra) return "";
            return palabra.split(" ").slice(0, cantidad).join(" ") + (isBandera ? "..." : "") || "";
        },
        async filtersAll() {
            // this.isLoading = true;
            try {
                const [magistrados, filters] = await Promise.all([
                    MagistradoProxy.list({ ROWS: 1000, INIT: 0, DESC: null }).catch(() => []),
                    filterProxy.list({ NIVEL: 5 }, null).catch(() => []),
                ]);

                this.magistrados(magistrados);
                this.filtrosNiveles(filters);
            } catch (error) {
                toast.error("Ocurrió un error al cargar los filtros", { toastId: "error" });
                this.isLoading = false;

            } finally {
                this.isLoading = false;
            }
        },
        cortarDescripcion(texto) {
            if (texto.length > 30) {
                return texto.slice(0, 30) + '...';
            }
            return texto;
        },
        magistrados(magistrados) {
            this.selects["MAGISTRATES"] = magistrados
                .map(item => ({
                    value: item.ID,
                    label: `${item.APELLIDOS} ${item.NOMBRES}`,
                }))
                .sort((a, b) => a.label.localeCompare(b.label));
        },
        filtrosNiveles(data) {
            data.forEach(item => {
                const NIVEL_2 = JSON.parse(item.NIVEL_2);
                this.selects[item.LABEL.toUpperCase()] = NIVEL_2.map(item => ({
                    value: item.VALUE,
                    label: item.LABEL,
                    children: item.NIVEL_3.map(item2 => ({
                        value: item2.VALUE,
                        label: item2.LABEL,
                        children: item2.NIVEL_4.map(item3 => ({
                            value: item3.VALUE,
                            label: item3.LABEL,
                            children: item3.NIVEL_5.map(item4 => ({
                                value: item4.VALUE,
                                label: item4.LABEL,
                                children: item4.NIVEL_6.map(item5 => ({
                                    value: item5.VALUE,
                                    label: item5.LABEL,
                                })),
                            })),
                        })),
                    })),
                }));
            });

            this.items = data.map(item => ({
                title: item.LABEL,
                description: item.DESCPINF,
            }));
        },
        onClear(indicador = 0) {
            this.filter.GLOBAL = null;
            this.filter.FRESOLUTION1 = null;
            this.filter.DELITO = [];
            this.filter.NMRCN = null;
            this.filter.TPONRMA = [];
            this.filter.OEMISOR = null;
            this.filter.RECURSO = [];
            this.filter.OJURISDICCIONAL = [];
            this.filter.MAGISTRATES = [];
            this.filter.JVINCULANTE = [];
            this.filter.FRESOLUTION2 = null;
            this.filter.MATERIA = [];
            this.filter.JURISDICCION = [];
            this.filter.TITLE = null;
            this.filter.CRITERIO = null;
            this.filter.KEYWORDS = [];
            this.filter.TEMA = null;
            this.filter.BLOG = false;
            this.filter.SUBTEMA = null;
            //this.isFilter = "generales";

            this.isCollapsed = true;
            this.showFilters = false;
            this.dataComplete = [];
            this.resultados = [];
            this.table.currentPage = 1;
            this.table.perPage = 10;
            this.table.totalRows = 0;

            if (indicador == 1) {
                this.resultados = [];
                this.table.currentPage = 1;
                return;
            }
            this.handleSearch(1);
        }


    },
    watch: {
        "role": {
            immediate: true,
            handler(val) {
                console.log("role", val);
            }
        },
        "filter.TYPE": {
            handler() {
                this.filter = {
                    ...this.filter,
                    ...this.default
                }
            },
            immediate: true,
        },
        "isFilter": {
            handler() {
                this.filter = {
                    ...this.filter,
                    ...this.default
                }
            },
            immediate: true,
        },
        "typeSaarch": {
            handler() {
                this.listTopSearch();
            },
            immediate: true,
        },
    },
    mounted() {
        this.isLoading = true;
        this.listTopSearch();
        this.filtersAll();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>


<style scoped>
.z-1050 {
    z-index: 1050;
}

.floating-delitos {
    position: relative;
    z-index: 1050;
}

.floating-delitos .fixed {
    backdrop-filter: blur(8px);
}

/* CSS global o en <style scoped> */
.force-open-down {
    top: 100% !important;
    bottom: auto !important;
    transform: translateY(0px) !important;
}

/* Anula colocación automática hacia arriba */
.force-open-down[data-p-popper-placement^="top"] {
    top: 100% !important;
}


.dropdown-button {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 700;
    background: white;
    color: #DF2DB2;
    border-radius: 16px 16px 0px 0px;
    border: 2px solid #DF2DB2;
    border-bottom: none;
    padding: 12px 24px;
    transition: all 0.3s ease;
    box-shadow: 0 -4px 12px rgba(223, 45, 178, 0.15);
    backdrop-filter: blur(10px);
}

.dropdown-button:hover {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 100%);
    color: white;
    box-shadow: 0 -6px 16px rgba(223, 45, 178, 0.25);
}

.card-items {
    font-family: 'Lato', sans-serif;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-radius: 16px;
    padding: 20px;
    gap: 16px;
    background: rgba(255, 255, 255, 0.98);
    border: 2px solid #DF2DB2;
    border-top: none;
    box-shadow: 0 8px 32px rgba(223, 45, 178, 0.2);
    backdrop-filter: blur(12px);
    position: relative;
}

.card-items::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%);
    border-radius: 16px;
    pointer-events: none;
}

@media (max-width: 768px) {
    .card-items {
        grid-template-columns: repeat(2, 1fr);
        width: max-content;
        margin: 0px 10px;
    }
}

.card-items .card-body {
    padding: 16px;
    margin: 0px;
    border-radius: 16px;
    background: white !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
    position: relative;
    z-index: 1;
}

.card-items .card-body:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(223, 45, 178, 0.15);
    border-color: #DF2DB2;
}

.card-items .card-body .card-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px !important;
    font-weight: 700;
    color: #DF2DB2;
}

.card-items .card-body h5 {
    color: #2D3748;
    text-align: left;
    font-size: 13px !important;
    font-weight: 600;
}

.card-items .card-body p {
    color: #4A5568;
    font-size: 12px !important;
    text-align: justify;
    line-height: 1.6;
}

/* Transición suave del card */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
}



.form-switch .form-check-input {
    margin-left: 0rem !important;
}

.landing-busqueda {
    background-image: url("../../assets/img/backgrounds/bg-busqueda.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    z-index: 1;
    min-height: 100vh;
    font-family: 'Lato', sans-serif;
}

.logo-busqueda {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    z-index: 1;
    transition: transform 0.3s ease;
}

.logo-busqueda:hover {
    transform: scale(1.05);
}

::v-deep(.p-autocomplete-input) {
    border: none !important;
    width: 100%;
    padding: 14px 20px !important;
    font-size: 15px !important;
    font-weight: 500;
    color: #2D3748;
    background: transparent;
}

::v-deep(.p-autocomplete-input::placeholder) {
    color: #A0AEC0;
    font-weight: 400;
}

/* Contenedor principal */
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 1000px;
    position: relative;
    overflow: visible !important;
    margin-bottom: 1rem;
}

/* Contenedor del input */
.search-box {
    display: flex;
    align-items: center;
    width: 100%;
    background: white;
    border-radius: 50px;
    padding: 6px;
    box-shadow: 0 8px 30px rgba(223, 45, 178, 0.15);
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.search-box:focus-within {
    box-shadow: 0 12px 40px rgba(223, 45, 178, 0.25);
    border-color: #DF2DB2;
}

/* Estilos del input */
.search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px 16px;
    font-size: 15px;
    width: 100%;
    font-family: 'Lato', sans-serif;
}

/* Botón para limpiar en el search */
.btn-clear {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 36px;
    height: 36px;
}

.btn-clear:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(223, 45, 178, 0.4);
}

.btn-clear img {
    width: 16px;
    height: 16px;
    filter: brightness(0) invert(1);
}

.search-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    margin-top: 16px;
}

@media (max-width: 600px) {
    .search-actions {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }

    .search-actions .btn-search,
    .search-actions .btn-clear-button {
        width: 100%;
        margin: 6px 0;
    }
}

/* Separador */
.separator {
    width: 2px;
    height: 32px;
    background: linear-gradient(180deg, transparent, #DF2DB2, transparent);
    margin: 0 8px;
}

/* Botón de filtro */
.btn-filter {
    background: white;
    border: 2px solid #E2E8F0;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
}

.btn-filter:hover {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    border-color: transparent;
    transform: scale(1.1);
}

.btn-filter:hover img {
    filter: brightness(0) invert(1);
}

.btn-filter img {
    width: 20px;
    height: 20px;
    transition: filter 0.3s ease;
}

/* Botón de búsqueda */
.btn-search {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    color: white;
    border: none;
    padding: 14px 40px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(223, 45, 178, 0.3);
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.5px;
}

.btn-search:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(223, 45, 178, 0.4);
}

.btn-search:active {
    transform: translateY(0);
}

.btn-clear-button {
    background: white !important;
    color: #EF4444 !important;
    border: 2px solid #EF4444 !important;
    padding: 14px 40px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
    border-radius: 50px;
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.5px;
}

.btn-clear-button:hover {
    background: #EF4444 !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
}

.search-results {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 90%;
    max-width: 1200px;
    margin: 1rem auto;
}

.result-item {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 16px 20px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.result-item:hover {
    box-shadow: 0 8px 30px rgba(223, 45, 178, 0.15);
    transform: translateY(-4px);
    border-color: #DF2DB2;
}

/* Título */
.result-title {
    display: flex;
    font-family: 'Lato', sans-serif;
    justify-content: start;
    gap: 8px;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.result-title:hover {
    transform: translateX(4px);
}

/* Icono de flecha */
.result-title img {
    width: 18px;
    height: 18px;
}

/* Pretensión / Delito */
.result-info {
    font-size: 13px;
    font-family: 'Lato', sans-serif;
    margin: 8px 0;
    color: #4A5568;
    line-height: 1.5;
}

.result-info strong {
    color: #2D3748;
    font-weight: 700;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Síntesis */
#filterbar {
    max-width: 600px;
}

/* // en mobil */
@media (max-width: 600px) {
    #filterbar {
        width: 100%;
    }
}


.result-summary {
    font-size: 13px;
    color: #555;
    line-height: 1.8;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu.filterbar-overlay {
    position: absolute;
    top: 100%;
    /* Justo debajo del botón */
    right: -20px;
    z-index: 1050;
    display: block;
    width: max-content !important;
    margin-top: 10px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
}

.no-results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    max-width: 600px;
    margin: 1.5rem auto;
    padding: 60px 40px;
    background: white;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.no-results-icon {
    margin-bottom: 24px;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.no-results-title {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: 'Lato', sans-serif;
}

.no-results-description {
    font-size: 16px;
    font-weight: 500;
    color: #4A5568;
    text-align: center;
    line-height: 1.6;
    font-family: 'Lato', sans-serif;
    margin-bottom: 32px;
}

.no-results-tips {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
}

.tip-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 20px;
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
    border-radius: 16px;
    border: 2px solid rgba(223, 45, 178, 0.1);
    transition: all 0.3s ease;
}

.tip-item:hover {
    transform: translateY(-4px);
    border-color: #DF2DB2;
    box-shadow: 0 4px 15px rgba(223, 45, 178, 0.15);
}

.tip-icon {
    font-size: 28px;
    filter: grayscale(0.3);
}

.tip-text {
    font-size: 13px;
    font-weight: 600;
    color: #4A5568;
    font-family: 'Lato', sans-serif;
}

@media (max-width: 600px) {
    .no-results {
        padding: 40px 24px;
    }

    .no-results-title {
        font-size: 20px;
    }

    .no-results-description {
        font-size: 14px;
    }

    .no-results-tips {
        gap: 12px;
    }

    .tip-item {
        padding: 12px 16px;
    }
}

/* Loader personalizado */
.custom-loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(8px);
}

.custom-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}

.loader-spinner {
    position: relative;
    width: 80px;
    height: 80px;
}

.spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid transparent;
    animation: rotate 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring:nth-child(1) {
    border-top-color: #DF2DB2;
    animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
    border-top-color: #8B5CF6;
    animation-delay: 0.15s;
    width: 90%;
    height: 90%;
    top: 5%;
    left: 5%;
}

.spinner-ring:nth-child(3) {
    border-top-color: #185CE6;
    animation-delay: 0.3s;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loader-text {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Responsivo */
@media (max-width: 600px) {
    .no-results {
        margin-top: 10px;
    }

    #filterbar {
        /* // pocisionarlo al inicio */
        max-width: 350px;
        margin-left: -330px !important;

    }

}




@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif
}


.text-initial {
    margin-top: 3rem;
}


/* //celular */
@media (min-width: 320px) and (max-width: 600px) {
    .text-initial {
        margin-top: 0rem;
    }
}

.buttons-filter {
    display: flex;
    flex-direction: row;
}


@media (max-width: 768px) {
    .buttons-filter {
        display: flex;
        flex-direction: column;
    }

    .buttons-filter button {
        width: auto !important;
        justify-content: center;
    }
}

.card-container li {
    /* // ponerle estilo de li */
    list-style: outside;
}

.sin_resultados {
    padding: 20px;
    border-radius: 0.375rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #718096;
    font-size: 1.5rem;
    border: none;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    background-color: #f5f8ffff;
}


.sin_resultados p {
    margin: 0px;
}

.sin_resultados span {
    font-size: 1rem !important;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
}

@media (max-width: 768px) {
    .sin_resultados {
        width: 90% !important;
        margin: 20px auto 0 auto !important;
    }

    .sin_resultados p {
        font-size: 1.2rem !important;
    }

    .sin_resultados span {
        font-size: 1rem !important;
    }
}

.container {
    margin: 40px auto
}

#header {
    width: 100%;
    height: 60px;
    box-shadow: 5px 5px 15px #e8e8e8
}

.col-lg-4,
.col-md-6 {
    padding-right: 0
}

button.btn.btn-hide {
    height: inherit;
    color: #fff;
    font-size: 0.82rem;
    padding-left: 40px;
    font-weight: bold;
    padding-right: 40px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px
}



select {
    outline: none;
    padding: 6px 12px;
    margin: 0px 4px;
    color: #999;
    font-size: 0.85rem;
    width: 140px
}

#select2 {
    border: 1px solid #777;
    color: #999
}

#pro {
    border: none;
    color: #333;
    font-weight: 700;
    padding-left: 0px;
    width: initial
}

#filterbar {
    width: 30%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
    float: left
}

#filterbar input[type="radio"] {
    display: none;
}

#filterbar-container2 .form-check {
    background: white;
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 8px;
    border: 2px solid #E2E8F0;
    transition: all 0.3s ease;
    cursor: pointer;
}

#filterbar-container2 .form-check:hover {
    border-color: #DF2DB2;
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%);
    transform: translateX(4px);
}

#filterbar-container2 .form-check-input:checked ~ .form-check-label {
    color: #DF2DB2;
    font-weight: 700;
}

#filterbar-container2 .form-check-input:checked {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 100%);
    border-color: #DF2DB2;
}

#filterbar-container2 .form-check-label {
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #4A5568;
    cursor: pointer;
    transition: all 0.3s ease;
}

#filterbar-container2 .form-check-input {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 2px solid #E2E8F0;
    cursor: pointer;
}

#filterbar .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 115px
}

#filterbar .btn.btn-success:hover {
    background-color: #e7f0ff !important;
    color: #444
}

#filterbar .btn-success:not(:disabled):not(.disabled).active,
#filterbar .btn-success:not(:disabled):not(.disabled):active {
    background-color: #3b82f6 !important;
    color: #fff
}

label {
    cursor: pointer
}

.tick {
    display: block;
    position: relative;
    padding-left: 23px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0
}

.tick input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0
}

.check {
    position: absolute;
    top: 1px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px
}

.tick:hover input~.check {
    background-color: #f3f3f3
}

.tick input:checked~.check {
    background-color: #ffffff
}

.check:after {
    content: "";
    position: absolute;
    display: none
}

.tick input:checked~.check:after {
    display: block;
    transform: rotate(45deg) scale(1)
}

.tick .check:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid rgb(0, 0, 0);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) scale(2)
}

.box {
    padding: 10px
}

.box-label {
    color: #11698e;
    font-size: 0.9rem;
    font-weight: 800
}

#inner-box,
#inner-box2 {
    height: 150px;
    overflow-y: scroll
}

#inner-box2 {
    height: 132px
}

#inner-box::-webkit-scrollbar,
#inner-box2::-webkit-scrollbar {
    width: 6px
}

#inner-box::-webkit-scrollbar-track,
#inner-box2::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 2px
}

#inner-box::-webkit-scrollbar-thumb,
#inner-box2::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 2px
}

#price {
    height: 45px
}

#size input[type="checkbox"] {
    visibility: hidden
}

#size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 40px;
    font-size: 0.8rem;
    border-radius: 0
}

#size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#size .btn-success:not(:disabled):not(.disabled).active,
#size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#size label {
    margin: 10px;
    margin-left: 0px
}



#avail-size input[type="checkbox"] {
    visibility: hidden
}

#avail-size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#avail-size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 20px;
    font-size: 0.7rem;
    border-radius: 0;
    padding: 0
}

#avail-size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#avail-size .btn-success:not(:disabled):not(.disabled).active,
#avail-size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#avail-size label {
    margin: 10px;
    margin-left: 0px
}

#shirt {
    height: 170px
}

.middle {
    position: relative;
    width: 100%;
    margin-top: 25px
}

.slider {
    position: relative;
    z-index: 1;
    height: 5px;
    margin: 0px;
}

.slider>.track {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #ddd
}

.slider>.range {
    position: absolute;
    z-index: 2;
    left: 25%;
    right: 25%;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #36a31b
}

.slider>.thumb {
    position: absolute;
    top: 2px;
    z-index: 3;
    width: 20px;
    height: 20px;
    background-color: #36a31b;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(63, 204, 75, 0.705);
    transition: box-shadow .3s ease-in-out
}

.slider>.thumb::after {
    position: absolute;
    width: 8px;
    height: 8px;
    left: 28%;
    top: 30%;
    border-radius: 50%;
    content: '';
    background-color: #fff
}

.slider>.thumb.left {
    left: 25%;
    transform: translate(-15px, -10px)
}

.slider>.thumb.right {
    right: 25%;
    transform: translate(15px, -10px)
}

.slider>.thumb.hover {
    box-shadow: 0 0 0 10px rgba(125, 230, 134, 0.507)
}

.slider>.thumb.active {
    box-shadow: 0 0 0 10px rgba(63, 204, 75, 0.623)
}

input[type=range] {
    position: absolute;
    pointer-events: none;
    -webkit-appearance: none;
    z-index: 2;
    height: 10px;
    width: 100%;
    opacity: 0
}

input[type=range]::-webkit-slider-thumb {
    pointer-events: all;
    width: 30px;
    height: 30px;
    border-radius: 0;
    border: 0 none;
    background-color: red;
    -webkit-appearance: none
}

.del {
    text-decoration: line-through;
    color: red
}

@media(min-width:1199.6px) {
    #filterbar {
        width: 25%
    }
}

@media(max-width:1199.5px) {
    #filterbar {
        width: 28%
    }

    .card {
        height: 350px
    }

    .price {
        font-size: 0.9rem
    }

    .product-name {
        font-size: 0.8rem
    }
}

@media(max-width: 991.5px) {
    .navbar-nav {
        min-width: 290px;
        position: absolute;
        left: -168px;
        bottom: -146px;
        padding: 20px 10px;
        display: block;
        background-image: none;
        z-index: 2;
        background-color: #1d1c1cb2
    }

    #filterbar {
        width: 36%
    }

    #sort {
        background-color: inherit;
        color: #fff;
        margin: 0;
        margin-bottom: 20px;
        width: 100%
    }

    #sort option,
    #pro option {
        color: #000
    }

    #pro,
    #select2,
    .result {
        background-color: inherit;
        color: #fff
    }

    .card {
        height: 345px
    }

    .price {
        font-size: 0.85rem
    }
}

@media(max-width: 767.5px) {
    #filterbar {
        width: 50%
    }

    .form-switch .form-check-input {
        margin-left: 0rem !important;
    }
}

@media(max-width: 525.5px) {
    #filterbar {
        float: none;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 5px
    }

    #content.my-5 {
        margin-top: 20px !important;
        margin-bottom: 20px !important
    }

    .col-lg-4,
    .col-md-6 {
        padding-left: 0
    }
}

@media(max-width: 500.5px) {
    .pagination {
        display: none
    }
}

.card h3 {
    font-size: 1rem;
}


#filterbar-container {
    position: absolute;
    top: calc(100% + 12px);
    z-index: 1050;
    left: 0;
    right: 10px;
    margin: 0 auto;
    width: 90%;
    background: white;
    border-radius: 24px;
    border: 2px solid #E2E8F0;
    box-shadow: 0 12px 40px rgba(223, 45, 178, 0.15);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

#filterbar-container2 {
    position: absolute;
    top: calc(100% + 12px);
    z-index: 1050;
    right: 10px;
    margin: 0 auto;
    width: 40%;
    background: white;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    box-shadow: 0 8px 30px rgba(223, 45, 178, 0.12);
    animation: slideDown 0.3s ease;
}

#filterbar-container .filter {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 0px;
    padding: 0px;
    border-radius: 24px;
    overflow: hidden;
}

.contenedor-tab-global {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: space-between;
    padding: 0px;
    border-bottom: 2px solid #F7FAFC;
    background: linear-gradient(to right, rgba(223, 45, 178, 0.03), rgba(24, 92, 230, 0.03));
}

.filter-header .ul-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.filter-header .ul-container a {
    display: flex;
    align-items: center;
    text-align: center;
}

.contenedor-tab {
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 12px;
    margin: 4px;
}

.contenedor-tab:hover {
    background: rgba(223, 45, 178, 0.05);
}

@media (max-width: 700px) {


    #filterbar-container {
        width: 90%;
        left: 10px;
        top: 10;
        border-radius: 0px;
    }

    #filterbar-container2 {
        width: 90%;
    }

    #filterbar-container2 label {
        font-size: 13px !important;
    }

    #filterbar-container .filter {
        grid-template-columns: 1fr;
        height: auto;
    }


    #filterbar-container .contenedor-tab img {
        width: 20px;
        height: 20px;
    }
}

#filterbar-container .container-nav,
.contenedor-cabeceras-a a {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #4A5568;
    cursor: pointer;
    transition: all 0.3s ease;
}

#filterbar-container .container-nav:hover,
.contenedor-cabeceras-a a:hover {
    color: #DF2DB2;
}

.active-criterio {
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(24, 92, 230, 0.1) 100%) !important;
    color: #DF2DB2 !important;
    font-weight: 700 !important;
    border-left: 4px solid #DF2DB2;
}

.contenedor-filtros {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin: 16px 0px;
    padding: 20px;
}

.filter-header {
    border-right: 2px solid #F7FAFC;
}

.contenedor-cabeceras-a {
    border-bottom: 2px solid #F7FAFC;
}

.contenedor-filtros .no-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
}

/* Estilos modernos para labels de filtros */
.contenedor-filtros .form-label {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    display: block;
}

/* Estilos para el-tree-select */
::v-deep(.el-tree-select) {
    width: 100% !important;
}

::v-deep(.el-select__suffix) {
    flex-shrink: 0;
}

::v-deep(.el-select__tags) {
    max-width: calc(100% - 30px);
    overflow: hidden;
    flex-wrap: wrap;
}

::v-deep(.el-select__wrapper) {
    background: white;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 10px 16px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    min-height: 42px;
    max-width: 100%;
    overflow: hidden;
}

::v-deep(.el-select__wrapper:hover) {
    border-color: #DF2DB2;
    box-shadow: 0 4px 12px rgba(223, 45, 178, 0.1);
}

::v-deep(.el-select__wrapper.is-focused) {
    border-color: #DF2DB2;
    box-shadow: 0 0 0 3px rgba(223, 45, 178, 0.1);
}

::v-deep(.el-select__placeholder) {
    color: #A0AEC0;
    font-weight: 500;
}

::v-deep(.el-select__tags-text) {
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    color: #DF2DB2;
    border-radius: 12px;
    padding: 4px 10px;
    font-weight: 600;
    font-size: 12px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}

::v-deep(.el-tag) {
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
    border: 1px solid #DF2DB2 !important;
    color: #DF2DB2 !important;
    border-radius: 12px !important;
    padding: 4px 12px !important;
    font-weight: 600 !important;
    max-width: 180px;
}

::v-deep(.el-tag .el-select__tags-text) {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
}

::v-deep(.el-select__selection) {
    max-width: 100%;
    overflow: hidden;
}

::v-deep(.el-select__selected-item) {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

::v-deep(.el-tag__close) {
    color: #DF2DB2 !important;
    transition: all 0.3s ease;
}

::v-deep(.el-tag__close:hover) {
    background: #DF2DB2 !important;
    color: white !important;
}

/* DatePicker modernizado */
::v-deep(.mx-datepicker) {
    width: 100% !important;
}

::v-deep(.mx-input) {
    background: white;
    border: 2px solid #E2E8F0 !important;
    border-radius: 16px !important;
    padding: 12px 16px !important;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #2D3748;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

::v-deep(.mx-input:hover) {
    border-color: #DF2DB2 !important;
    box-shadow: 0 4px 12px rgba(223, 45, 178, 0.1);
}

::v-deep(.mx-input:focus) {
    border-color: #DF2DB2 !important;
    box-shadow: 0 0 0 3px rgba(223, 45, 178, 0.1);
    outline: none;
}

::v-deep(.mx-input::placeholder) {
    color: #A0AEC0;
}

::v-deep(.mx-icon-calendar),
::v-deep(.mx-icon-clear) {
    color: #DF2DB2 !important;
}

/* Form Tags (Keywords) */
::v-deep(.b-form-tags) {
    background: white;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 8px 12px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

::v-deep(.b-form-tags:focus-within) {
    border-color: #DF2DB2;
    box-shadow: 0 0 0 3px rgba(223, 45, 178, 0.1);
}

::v-deep(.b-form-tag) {
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
    border: 1px solid #DF2DB2 !important;
    color: #DF2DB2 !important;
    border-radius: 12px !important;
    padding: 6px 12px !important;
    font-weight: 600 !important;
    font-family: 'Lato', sans-serif !important;
}

::v-deep(.b-form-tag .b-form-tag-remove) {
    color: #DF2DB2 !important;
    margin-left: 6px;
    transition: all 0.3s ease;
}

::v-deep(.b-form-tag .b-form-tag-remove:hover) {
    color: #EF4444 !important;
}

::v-deep(.b-form-tags-input) {
    border: none !important;
    outline: none !important;
    padding: 6px 8px !important;
    font-family: 'Lato', sans-serif;
}

/* Switch modernizado */
.switch-container {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
    border-radius: 16px;
    border: 2px solid rgba(223, 45, 178, 0.1);
}

.switch-label {
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.switch {
    position: relative;
    display: inline-block;
    border: none;
    border-radius: 50px;
    width: 54px;
    height: 28px;
    flex-shrink: 0;
    overflow: hidden;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #E2E8F0;
    margin: 0;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.slider::before {
    content: "";
    position: absolute;
    height: 22px;
    width: 22px;
    left: 3px;
    top: 3px;
    background: white;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
}

input:checked + .slider::before {
    transform: translateX(26px);
    box-shadow: 0 2px 10px rgba(223, 45, 178, 0.5);
}

.info-icon {
    width: 20px;
    height: 20px;
    opacity: 0.7;
    transition: all 0.3s ease;
}

.info-icon:hover {
    opacity: 1;
    transform: scale(1.1);
}

.top-search-container {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0.5rem 0 1rem 0;
}

.top-search-carousel {
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 1200px;
    gap: 5px;
    border-radius: 8px;
    position: relative;
    overflow: visible !important;
    margin: 0 auto;
}

/* Oculta scroll en navegadores Webkit */
.top-search-carousel::-webkit-scrollbar {
    display: none;
}

.top-search-chip {
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(24, 92, 230, 0.1) 100%);
    color: #DF2DB2;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 6px;
    max-width: 280px;
}

.top-search-chip:hover {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(223, 45, 178, 0.3);
}

.top-search-chip:hover .btn-clear-item {
    background-color: rgba(255, 255, 255, 0.3) !important;
    border-color: white;
}

@media (max-width: 600px) {
    .top-search-carousel {
        flex-direction: column;
        width: 100%;
        padding: 0;
    }

    .top-search-chip {
        font-size: 11px;
        padding: 6px 12px;
        max-width: 240px;
    }
}

.el-tree-node__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 100%;
}

.el-select-dropdown .el-tree {
    max-width: 100%;
    overflow: hidden;
}

.p-tooltip {
    background: #e53935 !important;
    color: #fff !important;
    font-size: 0.75rem !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
    border: none !important;
    font-family: 'Lato', sans-serif !important;
}

.p-tooltip-arrow {
    border-top-color: #e53935 !important;
}

/* Estilos modernos para paginación */
::v-deep(.pagination) {
    gap: 8px;
}

::v-deep(.page-item .page-link) {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #E2E8F0;
    color: #4A5568;
    font-weight: 600;
    transition: all 0.3s ease;
    margin: 0 4px;
}

::v-deep(.page-item.active .page-link) {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%) !important;
    border-color: transparent !important;
    color: white !important;
    transform: scale(1.15);
    box-shadow: 0 4px 15px rgba(223, 45, 178, 0.3);
}

::v-deep(.page-item .page-link:hover) {
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border-color: #DF2DB2;
    color: #DF2DB2;
    transform: translateY(-2px);
}

.color-blue {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
}

.btn-clear-item {
    background: rgba(239, 68, 68, 0.2) !important;
    color: #EF4444 !important;
    border: 2px solid #EF4444;
    margin-right: 4px;
    padding: 2px 6px;
    cursor: pointer;
    font-size: 10px;
    font-weight: 700;
    transition: all 0.3s ease;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-clear-item:hover {
    background: #EF4444 !important;
    color: white !important;
    transform: scale(1.15);
    box-shadow: 0 2px 10px rgba(239, 68, 68, 0.4);
}

/* Botón scroll to top */
.scroll-to-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(223, 45, 178, 0.35);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    font-family: 'Lato', sans-serif;
}

.scroll-to-top-btn:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 32px rgba(223, 45, 178, 0.45);
}

.scroll-to-top-btn:active {
    transform: translateY(-2px) scale(1.02);
}

.scroll-to-top-btn svg {
    width: 24px;
    height: 24px;
}

/* Animación fade-scale */
.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
}

.fade-scale-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
}

@media (max-width: 768px) {
    .scroll-to-top-btn {
        bottom: 20px;
        right: 20px;
        width: 48px;
        height: 48px;
    }

    .scroll-to-top-btn svg {
        width: 20px;
        height: 20px;
    }
}
</style>