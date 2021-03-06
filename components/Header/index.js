import React, { useEffect } from "react";
import { useRoute, useNavigationState } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { faChevronLeft, faShoppingBasket, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'native-base';
import {useDispatch, useSelector} from "react-redux";

import OurText from "~/components/OurText";
import OurIconButton from "~/components/OurIconButton";
import styles from "./styles.js";


const isFirstRouteInParent = () => {
    const route = useRoute();
    const isFirstRouteInParent = useNavigationState(
        state => state.routes[0].key === route.key
    );

    return isFirstRouteInParent;
};

export const HeaderBackButton = (props) => {
    const { navigation } = props;

    const goBack = (e) => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <OurIconButton icon={faChevronLeft} size={49} onPress={goBack}/>
            </View>
        </View>
    );
};

export const HeaderTitle = (props) => {
    const { title, onPress } = props;

    const doPress = (e)=>{
        if ( onPress )
            onPress(e);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity activeOpacity={ onPress ? 0.2 : 1 } onPress={doPress}>
                    <OurText style={styles.title} translate={true}>{title}</OurText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const HeaderCartButton = (props) => {
    const { navigation } =  props;
    const state = useSelector(state=>state);

    const goToCart = (e) => {
        navigation.navigate("Cart");
    };

    return (
        <View style={styles.container}>
            <View style={styles.cartContainer}>
                <View style={styles.iconCart}>
                    <OurIconButton icon={faShoppingBasket} size={50} onPress={goToCart}>
                        {
                            state?.cartItems?.size ?
                                <Badge success style={styles.badge}>
                                    <OurText style={styles.badgeText}>
                                        {
                                            state?.cartItems?.size ?
                                                (() => {
                                                    if ( state.cartItems.size < 10 )
                                                        return state.cartItems.size;
                                                    else
                                                        return "9+";
                                                })()
                                                : <></>
                                        }
                                    </OurText>
                                </Badge>
                                : <></>
                        }
                    </OurIconButton>
                    {
                    state.cartTotalPrice ?
                        <OurText style={styles.priceText}>
                            {state.cartTotalPrice}
                        </OurText>
                    :
                        <></>
                    }
                </View>
            </View>
        </View>
    );
};

export const HeaderOrdersButton = (props) => {
    const { navigation } =  props;
    const state = useSelector(state=>state);

    const goToOrders = (e) => {
        navigation.navigate("Orders");
    };

    return (
        <View style={styles.container}>
            <View style={styles.cartContainer}>
                <View style={styles.iconCart}>
                    <OurIconButton icon={faBoxOpen} size={50} onPress={goToOrders}>
                        {
                            state?.orders?.size ?
                                <Badge success style={styles.badge}>
                                    <OurText style={styles.badgeText}>
                                        {
                                            state?.orders?.size ?
                                                (() => {
                                                    if ( state.orders.size < 10 )
                                                        return state.orders.size;
                                                    else
                                                        return "9+";
                                                })()
                                                : <></>
                                        }
                                    </OurText>
                                </Badge>
                                : <></>
                        }
                    </OurIconButton>
                </View>
            </View>
        </View>
    );
};


/** Шапочка приложения с навигацией*/
const Header = (props) =>
{
    const {
        title,
        titleFunc,
        showCart,
        navigation,
        backgroundColor,
    } = props;

    const showBack = (typeof(props.showBack) === "boolean")
        ? props.showBack : !isFirstRouteInParent();
    
    const state = useSelector(state=>state);
    const dispatch = useDispatch();

    const goBack = (e) => {
        navigation.goBack();
    };

    const goToCart = (e) => {
        navigation.navigate("Cart");
    };

    return (
        <>
            <View style={[styles.container, {backgroundColor}]}>
                <View style={styles.backContainer}>
                    {
                        showBack ?
                            <OurIconButton icon={faChevronLeft} size={49} onPress={goBack}/>
                            : <></>
                    }
                </View>

                <View style={styles.titleContainer}>
                    {title ?
                        <TouchableOpacity activeOpacity={ titleFunc ? 0.2 : 1 } onPress={()=>{
                            if (titleFunc)
                                titleFunc();
                        }}
                        >
                            <OurText style={styles.title} translate={true}>{title}</OurText>
                        </TouchableOpacity> : <></>
                    }
                </View>

                <View style={styles.cartContainer}>
                    {showCart ?
                        <View style={styles.iconCart}>
                            <OurIconButton icon={faShoppingBasket} size={50} onPress={goToCart}>
                                {
                                    state?.cartItems?.size ?
                                        <Badge success style={styles.badge}>
                                            <OurText style={styles.badgeText}>
                                                {
                                                    state?.cartItems?.size ?
                                                        (() => {
                                                            if ( state.cartItems.size < 10 )
                                                                return state.cartItems.size;
                                                            else
                                                                return "9+";
                                                        })()
                                                        : <></>
                                                }
                                            </OurText>
                                        </Badge>
                                        : <></>
                                }
                            </OurIconButton>
                            <OurText style={styles.priceText}>
                                {state.cartTotalPrice}$
                            </OurText>
                        </View> : <></>
                    }
                </View>
            </View>
        </>
    );
};

export default React.memo(Header);